import pipe from 'ramda/src/pipe';
import path from 'ramda/src/path';
import fetchPageData from '../../utils/fetchPageData';
import {
  augmentWithTimestamp,
  addIdsToBlocks,
  applyBlockPositioning,
} from '../../utils/sharedDataTransformers';
import parseInternalLinks from './convertToOptimoBlocks/blocks/internalLinks';
import addHeadlineBlock from './addHeadlineBlock';
import timestampToMilliseconds from './timestampToMilliseconds';
import addSummaryBlock from './addSummaryBlock';
import cpsOnlyOnwardJourneys from './cpsOnlyOnwardJourneys';
import addRecommendationsBlock from './addRecommendationsBlock';
import addBylineBlock from './addBylineBlock';
import addAnalyticsCounterName from './addAnalyticsCounterName';
import convertToOptimoBlocks from './convertToOptimoBlocks';
import processUnavailableMedia from './processUnavailableMedia';
import processMostWatched from './processMostWatched';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import getAdditionalPageData from '../utils/getAdditionalPageData';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const formatPageData = pipe(
  addAnalyticsCounterName,
  parseInternalLinks,
  timestampToMilliseconds,
);

export const only = (pageType, transformer) => (pageData, ...args) => {
  const isCorrectPageType = path(['metadata', 'type'], pageData) === pageType;
  return isCorrectPageType ? transformer(pageData, ...args) : pageData;
};

const processOptimoBlocks = pipe(
  only(MEDIA_ASSET_PAGE, processUnavailableMedia),
  addHeadlineBlock,
  addSummaryBlock,
  augmentWithTimestamp,
  addBylineBlock,
  addRecommendationsBlock,
  addIdsToBlocks,
  applyBlockPositioning,
  cpsOnlyOnwardJourneys,
);

// Here pathname is passed as a prop specifically for CPS includes
// This will most likely change in issue #6784 so it is temporary for now
const transformJson = async (json, pathname) => {
  try {
    const formattedPageData = formatPageData(json);
    const optimoBlocks = await convertToOptimoBlocks(
      formattedPageData,
      pathname,
    );
    return processOptimoBlocks(optimoBlocks);
  } catch (e) {
    // We can arrive here if the CPS asset is a FIX page
    // TODO: consider checking if FIX then don't transform JSON
    return json;
  }
};

export default async ({
  path: pathname,
  service,
  variant,
  pageType,
  toggles,
}) => {
  try {
    const { json, status } = await fetchPageData({ path: pathname, pageType });

    const additionalPageData = await getAdditionalPageData(
      json,
      service,
      variant,
    );
    const processedAdditionalData = processMostWatched({
      data: additionalPageData,
      service,
      path: pathname,
      toggles,
    });

    return {
      status,
      pageData: {
        ...(await transformJson(json, pathname)),
        ...processedAdditionalData,
      },
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    return { error: message, status };
  }
};
