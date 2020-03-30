import React from 'react';
import { bool, node, oneOf, string, number, object } from 'prop-types';
import getStatsDestination from './getStatsDestination';
import getStatsPageIdentifier from './getStatsPageIdentifier';
import getOriginContext from './getOriginContext';
import getEnv from './getEnv';
import getMetaUrls from './getMetaUrls';
import variantPropType from '../../models/propTypes/variants';

export const RequestContext = React.createContext({});

export const RequestContextProvider = ({
  children,
  bbcOrigin,
  id,
  isAmp,
  pageType,
  ssrData,
  service,
  statusCode,
  previousPath,
  pathname,
  variant,
  timeOnServer,
}) => {
  const { isUK, origin } = getOriginContext(bbcOrigin);
  const env = getEnv(origin);
  const platform = isAmp ? 'amp' : 'canonical';
  const statsDestination = getStatsDestination({
    isUK,
    env,
    service,
  });
  const statsPageIdentifier = getStatsPageIdentifier({
    pageType,
    service,
    id,
  });

  const value = {
    env,
    id,
    isUK,
    origin,
    pageType,
    isAmp,
    platform,
    statsDestination,
    statsPageIdentifier,
    statusCode,
    previousPath,
    variant,
    timeOnServer,
    ssrData,
    ...getMetaUrls(origin, pathname),
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

RequestContextProvider.propTypes = {
  bbcOrigin: string,
  children: node.isRequired,
  id: string,
  isAmp: bool.isRequired,
  pageType: oneOf([
    'article',
    'frontPage',
    'media',
    'error',
    'MAP',
    'FIX',
    'STY',
    'PGL',
  ]).isRequired,
  service: string.isRequired,
  statusCode: number,
  pathname: string.isRequired,
  previousPath: string,
  variant: variantPropType,
  // eslint-disable-next-line react/forbid-prop-types
  ssrData: object,
  timeOnServer: number,
};

RequestContextProvider.defaultProps = {
  bbcOrigin: null,
  id: null,
  statusCode: null,
  previousPath: null,
  variant: null,
  ssrData: null,
  timeOnServer: null,
};
