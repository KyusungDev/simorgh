/* eslint-disable react/prop-types */
import React from 'react';
import { StaticRouter } from 'react-router-dom';

// test helpers
import { render } from '@testing-library/react';
import assocPath from 'ramda/src/assocPath';
import fetchMock from 'fetch-mock';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';

// contexts
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';

// components to test
import StoryPage from '.';
import getInitialData from '#app/routes/cpsAsset/getInitialData';

// mock data
import pidginPageData from '#data/pidgin/cpsAssets/world-23252817';
import pidginMostReadData from '#data/pidgin/mostRead/index.json';
import pidginSecondaryColumnData from '#data/pidgin/secondaryColumn/index.json';
import igboPageData from '#data/igbo/cpsAssets/afirika-23252735';
import igboMostReadData from '#data/igbo/mostRead/index.json';
import igboSecondaryColumnData from '#data/igbo/secondaryColumn/index.json';
import ukrainianInRussianPageData from '#data/ukrainian/cpsAssets/news-russian-23333960.json';
import ukrainianSecondaryColumnData from '#data/ukrainian/secondaryColumn/index.json';
import ukrainianMostReadData from '#data/ukrainian/mostRead/index.json';

fetchMock.config.overwriteRoutes = false; // http://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration allows us to mock the same endpoint multiple times

jest.mock('#containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

jest.mock('#containers/ComscoreAnalytics', () => {
  const ComscoreAnalytics = () => <div>comscore</div>;
  return ComscoreAnalytics;
});

const Page = ({ pageData, service }) => (
  <StaticRouter>
    <ToggleContextProvider>
      <ServiceContextProvider
        pageLang={pageData.metadata.language}
        service={service}
      >
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType={pageData.metadata.type}
          pathname={pageData.metadata.locators.assetUri}
          service={service}
          statusCode={200}
        >
          <StoryPage service={service} pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  </StaticRouter>
);

jest.mock('#containers/PageHandlers/withPageWrapper', () => Component => {
  const PageWrapperContainer = props => (
    <div id="PageWrapperContainer">
      <Component {...props} />
    </div>
  );

  return PageWrapperContainer;
});

jest.mock('#containers/PageHandlers/withLoading', () => Component => {
  const LoadingContainer = props => (
    <div id="LoadingContainer">
      <Component {...props} />
    </div>
  );

  return LoadingContainer;
});

jest.mock('#containers/PageHandlers/withError', () => Component => {
  const ErrorContainer = props => (
    <div id="ErrorContainer">
      <Component {...props} />
    </div>
  );

  return ErrorContainer;
});

jest.mock('#containers/PageHandlers/withData', () => Component => {
  const DataContainer = props => (
    <div id="DataContainer">
      <Component {...props} />
    </div>
  );

  return DataContainer;
});

jest.mock('#containers/PageHandlers/withContexts', () => Component => {
  const ContextsContainer = props => (
    <div id="ContextsContainer">
      <Component {...props} />
    </div>
  );

  return ContextsContainer;
});

const pageType = 'cpsAsset';

describe('Story Page', () => {
  beforeEach(() => {
    process.env.SIMORGH_ICHEF_BASE_URL = 'https://ichef.test.bbci.co.uk';
  });

  afterEach(() => {
    fetchMock.restore();
    delete process.env.SIMORGH_ICHEF_BASE_URL;
  });

  describe('snapshots', () => {
    it('should match snapshot for STY', async () => {
      fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
      fetchMock.mock(
        'http://localhost/pidgin/mostread.json',
        pidginMostReadData,
      );
      fetchMock.mock(
        'http://localhost/pidgin/sty-secondary-column.json',
        pidginSecondaryColumnData,
      );

      const { pageData } = await getInitialData({
        path: '/some-cps-sty-path',
        service: 'pidgin',
        pageType,
      });

      await matchSnapshotAsync(<Page pageData={pageData} service="pidgin" />);
    });
  });

  it('should only render firstPublished timestamp for Igbo when lastPublished is less than 1 min later', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', igboPageData);
    fetchMock.mock('http://localhost/igbo/mostread.json', igboMostReadData);
    fetchMock.mock(
      'http://localhost/igbo/sty-secondary-column.json',
      igboSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const { getByText } = render(<Page pageData={pageData} service="igbo" />);
    expect(getByText('23 Ọktọba 2019')).toBeInTheDocument();
  });

  it('should not show the pop-out timestamp when allowDateStamp is false', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', igboPageData);
    fetchMock.mock('http://localhost/igbo/mostread.json', igboMostReadData);
    fetchMock.mock(
      'http://localhost/igbo/sty-secondary-column.json',
      igboSecondaryColumnData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'igbo',
      pageType,
    });

    const pageDataWithHiddenTimestamp = assocPath(
      ['metadata', 'options', 'allowDateStamp'],
      false,
      pageData,
    );

    const { asFragment } = render(
      <Page pageData={pageDataWithHiddenTimestamp} service="pidgin" />,
    );

    expect(document.querySelector('main time')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when the secondary column data is not available', async () => {
    fetchMock.mock('http://localhost/some-cps-sty-path.json', pidginPageData);
    fetchMock.mock('http://localhost/pidgin/mostread.json', pidginMostReadData);
    fetchMock.mock('http://localhost/pidgin/sty-secondary-column.json', {});

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'pidgin',
      pageType,
    });

    await matchSnapshotAsync(<Page pageData={pageData} service="pidgin" />);
  });

  it('should render secondary column with lang attribute of `serviceLang` when a language override is present', async () => {
    fetchMock.mock(
      'http://localhost/some-cps-sty-path.json',
      ukrainianInRussianPageData,
    );
    fetchMock.mock(
      'http://localhost/ukrainian/sty-secondary-column.json',
      ukrainianSecondaryColumnData,
    );
    fetchMock.mock(
      'http://localhost/ukrainian/mostread.json',
      ukrainianMostReadData,
    );

    const { pageData } = await getInitialData({
      path: '/some-cps-sty-path',
      service: 'ukrainian',
      pageType,
    });

    render(<Page pageData={pageData} service="ukrainian" />);

    const secondaryColumn = document.querySelector(
      'div[class*="SecondaryColumn"]',
    );

    expect(secondaryColumn).toHaveAttribute('lang', 'uk');
  });
});
