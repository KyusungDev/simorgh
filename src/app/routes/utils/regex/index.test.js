import { matchPath } from 'react-router-dom';
import {
  articlePath,
  articleDataPath,
  articleSwPath,
  articleManifestPath,
  frontPagePath,
  frontPageDataPath,
  frontPageManifestPath,
  frontPageSwPath,
  cpsAssetPagePath,
  cpsAssetPageDataPath,
  liveRadioPath,
  onDemandRadioPath,
  onDemandTvPath,
  mostReadDataRegexPath,
  mostWatchedDataPath,
  legacyAssetPagePath,
  legacyAssetPageDataPath,
  secondaryColumnDataRegexPath,
  recommendationsDataRegex,
} from './index';

jest.mock('#server/utilities/serviceConfigs', () => ({
  news: {},
  persian: {},
}));

const matchRoute = (route, pathValue) => {
  const match = matchPath(route, {
    path: pathValue,
    exact: true,
    strict: true,
  });

  return match ? match.isExact : false;
};

const shouldMatchValidRoutes = (routes, pathValue) => {
  it.each(routes)('should match valid route %s', route => {
    expect(matchRoute(route, pathValue)).toBe(true);
  });
};

const shouldNotMatchInvalidRoutes = (routes, pathValue) => {
  it.each(routes)('should not match invalid route %s', route => {
    expect(matchRoute(route, pathValue)).toBe(false);
  });
};

describe('articlePath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/news/articles/c5jje4ejkqvo.amp',
    '/persian/articles/c7eel0lmr4do',
    '/news/articles/c5jje4ejkqvo/simp',
    '/news/articles/c5jje4ejkqvo/trad.amp',
    '/persian/articles/c7eel0lmr4do/lat',
    '/cymrufyw/erthyglau/c7eel0lmr4do',
    '/cymrufyw/erthyglau/c7eel0lmr4do.amp',
    '/naidheachdan/sgeulachdan/c7eel0lmr4do',
  ];
  shouldMatchValidRoutes(validRoutes, articlePath);

  const invalidRoutes = [
    '/iplayer/articles/c5jje4ejkqvo',
    '/news/article/c5jje4ejkqvo.amp',
    '/persian/c7eel0lmr4do',
    '/news/articles/c12o',
    '/news/articles/c5jje4ejkqv',
    '/news/articles/',
    '/news/articles/c5jje4ejkqvo/foobar',
    '/news/articles/c5jje4ejkqvo/.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articlePath);
});

describe('articleDataPath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo.json',
    '/persian/articles/c7eel0lmr4do.json',
    '/news/articles/c5jje4ejkqvo/lat.json',
    '/persian/articles/c7eel0lmr4do/trad.json',
    '/cymrufyw/erthyglau/c5jje4ejkqvo.json',
  ];
  shouldMatchValidRoutes(validRoutes, articleDataPath);

  const invalidRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/persian/articles/c7eel0lmr4do',
    '/iplayer/articles/c7eel0lmr4do.json',
    '/persian/articles/c7eel0lmr4do/.json',
    '/persian/articles/c7eel0lmr4do/foobar.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleDataPath);
});

describe('frontPagePath', () => {
  const validRoutes = [
    '/news',
    '/persian',
    '/news.amp',
    '/persian.amp',
    '/news/simp',
    '/persian/trad',
    '/news/lat.amp',
    '/persian/cyr.amp',
  ];
  shouldMatchValidRoutes(validRoutes, frontPagePath);

  const invalidRoutes = [
    '/news/home',
    '/persian/c5jje4ejkqvo.amp',
    '/iplayer',
    '/news/foobar',
    '/news/foobar.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontPagePath);
});

describe('frontPageDataPath', () => {
  const validRoutes = [
    '/news.json',
    '/persian.json',
    '/news/cyr.json',
    '/persian/trad.json',
  ];
  shouldMatchValidRoutes(validRoutes, frontPageDataPath);

  const invalidRoutes = [
    '/news/data.json',
    '/iplayer.json',
    '/news/foobar.json',
    '/persian/.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontPageDataPath);
});

describe('articleSwPath', () => {
  const validRoutes = [
    '/news/articles/sw.js',
    '/persian/articles/sw.js',
    '/cymrufyw/erthyglau/sw.js',
  ];
  shouldMatchValidRoutes(validRoutes, articleSwPath);

  const invalidRoutes = [
    '/news/sw.js',
    '/persian/articles/sw',
    '/news/trad/sw.js',
    '/cymrufyw/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleSwPath);
});

describe('manifestPath', () => {
  const validRoutes = [
    '/news/articles/manifest.json',
    '/persian/articles/manifest.json',
    '/naidheachdan/sgeulachdan/manifest.json',
  ];
  shouldMatchValidRoutes(validRoutes, articleManifestPath);

  const invalidRoutes = [
    '/news/manifest.json',
    '/persian/articles/manifest',
    '/news/simp/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleManifestPath);
});

describe('frontPageSwPath', () => {
  const validRoutes = ['/news/sw.js', '/persian/sw.js'];
  shouldMatchValidRoutes(validRoutes, frontPageSwPath);

  const invalidRoutes = [
    '/news/articles/sw.js',
    '/persian/sw',
    '/persian/simp/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontPageSwPath);
});

describe('frontPageManifestPath', () => {
  const validRoutes = ['/news/manifest.json', '/persian/manifest.json'];
  shouldMatchValidRoutes(validRoutes, frontPageManifestPath);

  const invalidRoutes = [
    '/foobar/manifest.json',
    '/foobar/manifest',
    '/news/trad/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontPageManifestPath);
});

describe('onDemandRadioPath', () => {
  const validRoutes = [
    '/indonesia/bbc_indonesian_radio/w34rfd4k', // onDemand radio any media id
    '/hausa/bbc_hausa_radio/abcd1234.amp', // onDemand radio amp w/ any media id
    '/persian/bbc_abcdefg_radio/hijklmn', // onDemand radio with a-z inside service id and for media id
    '/arabic/bbc_arabic_radio/radioschedule', // default radio schedule route
    '/indonesia/bbc_indonesian_radio/programmes/w34rfd4k', // onDemand radio brand any media id
    '/indonesia/bbc_indonesian_radio/programmes/w34rfd4k.amp', // onDemand radio brand amp any media id
    '/zhongwen/simp/bbc_cantonese_radio/w5192pdkg', // onDemand radio with valid variant
  ];
  shouldMatchValidRoutes(validRoutes, onDemandRadioPath);

  const invalidRoutes = [
    '/hausa/bbc_hausa_radio/',
    '/hausa/bbc_hausa_radio/.amp',
    '/foobar/bbc_hausa_radio/abcd1234',
    '/persian/foobar/abcd1234',
    '/persian/foobar/abcd1234.amp',
    '/indonesia/bbc_indonesian_radio/programmes/',
    '/zhongwen/troll/bbc_cantonese_radio/w5192pdkg', // onDemand radio with invalid variant
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, onDemandRadioPath);
});

describe('liveRadioPath', () => {
  const validRoutes = [
    '/hausa/bbc_hausa_radio/liveradio', // default live radio
    '/persian/bbc_dari_radio/liveradio', // live radio other service
    '/hausa/bbc_hausa_radio/liveradio.amp', // live radio amp
    '/hausa/bbc_persian_radio/liveradio', // service with non matching live radio service id
  ];
  shouldMatchValidRoutes(validRoutes, liveRadioPath);

  const invalidRoutes = [
    '/hausa/bbc_hausa_radio/', // live radio with no media id
    '/hausa/bbc_hausa_radio/.amp', // live radio with no media id amp
    '/foobar/bbc_hausa_radio/liveradio', // live radio w/ unknown service
    '/persian/foobar/liveradio', // live radio w/ non-formatted service id
    '/persian/foobar/liveradio.amp', // live radio w/ non-formatted service id amp
    '/blah/bbc_hausa_radio/livetv', // live radio w/ unknown service
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, liveRadioPath);
});

describe('mostReadDataRegexPath', () => {
  const validRoutes = ['/news/mostread.json', '/zhongwen/mostread/simp.json'];
  shouldMatchValidRoutes(validRoutes, mostReadDataRegexPath);

  const invalidRoutes = [
    '/foobar/mostread.json',
    '/foobar/mostread',
    '/foobar/mostread.js',
    '/news/trad/mostread.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, mostReadDataRegexPath);
});

describe('mostWatchedDataPath', () => {
  const validRoutes = [
    '/news/mostwatched.json',
    '/zhongwen/mostwatched/simp.json',
  ];
  shouldMatchValidRoutes(validRoutes, mostWatchedDataPath);

  const invalidRoutes = [
    '/foobar/mostwatched.json',
    '/foobar/mostwatched',
    '/foobar/mostwatched.js',
    '/news/trad/mostwatched.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, mostWatchedDataPath);
});

describe('secondaryColumnDataRegexPath', () => {
  const validRoutes = [
    '/mundo/sty-secondary-column.json',
    '/zhongwen/sty-secondary-column/simp.json',
  ];
  shouldMatchValidRoutes(validRoutes, secondaryColumnDataRegexPath);

  const invalidRoutes = [
    '/foobar/sty-secondary-column.json',
    '/foobar/sty-secondary-column',
    '/foobar/sty-secondary-column.js',
    '/news/trad/sty-secondary-column.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, secondaryColumnDataRegexPath);
});

describe('recommendationsDataRegex', () => {
  const validRoutes = [
    '/mundo/23263889/recommendations.json',
    '/zhongwen/uk-23283128/recommendations/simp.json',
  ];
  shouldMatchValidRoutes(validRoutes, recommendationsDataRegex);

  const invalidRoutes = [
    '/foobar/23124/recommendations.json',
    '/foobar/recommendations.json',
    '/foobar/recommendations',
    '/foobar/recommendations.js',
    '/zhongwen/trad/recommendations.json',
    '/zhongwen/12322/trad/recommendations.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, recommendationsDataRegex);
});

describe('onDemandTvPath', () => {
  const validRoutes = [
    '/indonesia/bbc_indonesian_tv/tv/w34rfd4k',
    '/indonesia/bbc_indonesian_tv/tv_programmes/w4321',
    '/indonesia/bbc_indonesian_tv/tv/w34rfd4k.amp',
    '/indonesia/bbc_indonesian_tv/tv_programmes/w4321.amp',
    '/persian/bbc_persian_tv/tv_programmes/abcd1234.amp',
    '/persian/bbc_persian_tv/tv/abcd4321.amp',
  ];
  shouldMatchValidRoutes(validRoutes, onDemandTvPath);

  const invalidRoutes = [
    '/hausa/bbc_hausa_tv/',
    '/hausa/bbc_hausa_tv/.amp',
    '/hausa/bbc_hausa_tv/wr321',
    '/hausa/bbc_hausa_tv/wr321.amp',
    '/foobar/bbc_hausa_tv/abcd1234',
    '/foobar/bbc_hausa_tv/abcd1234.amp',
    '/persian/foobar/abcd1234',
    '/persian/foobar/abcd1234.amp',
    '/indonesia/bbc_indonesian_tv/tv_programmes/',
    '/indonesia/bbc_indonesian_tv/tv/',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, onDemandTvPath);
});

describe('cpsAssetPagePath', () => {
  const validRoutes = [
    '/pidgin/12345678',
    '/pidgin/12345678.amp',
    '/pidgin/tori-49450859',
    '/pidgin/tori-49450859.amp',
    '/yoruba/media-49450859',
    '/yoruba/media-49450859.amp',
    '/punjabi/international-49567825',
    '/punjabi/international-49567825.amp',
    '/kyrgyz/sapar-tv-48695523',
    '/mundo/test_underscore-12345678',
    '/zhongwen/simp/test-12345678',
    '/zhongwen/trad/test-12345678',
    '/zhongwen/simp/test-12345678.amp',
  ];

  shouldMatchValidRoutes(validRoutes, cpsAssetPagePath);

  // According to CPS a valid assetUri should have 8 digits or more and CPS index is optional
  const inValidRoutes = [
    '/pidgin/1234567',
    '/pidgin/12345678/.amp',
    '/blah/12345678',
    '/pidgin/test-494859',
    '/blah/test-49450859',
    '/pidgin/test-49450859/.amp',
    '/pidgin/test-49450859/',
    '/pidgin/test-494859.amp',
    // Below are legacy asset routes - should not match CPS routes
    '/sinhala/sri_lanka/2015/02/150218_mahinda_rally_sl',
    '/hausa/multimedia/2014/05/140528_hip_hop_40years_gallery',
  ];
  shouldNotMatchInvalidRoutes(inValidRoutes, cpsAssetPagePath);
});

describe('cpsAssetPageDataPath', () => {
  const validRoutes = [
    '/pidgin/12345678.json',
    '/pidgin/test-49450859.json',
    '/kyrgyz/test-tv-48695523.json',
    '/mundo/test_underscore-12345678.json',
    '/zhongwen/simp/test-12345678.json',
    '/zhongwen/trad/test-12345678.json',
  ];

  shouldMatchValidRoutes(validRoutes, cpsAssetPageDataPath);

  // According to CPS a valid assetUri should have 8 digits or more and CPS index is optional
  const inValidRoutes = [
    '/pidgin/1234567.json',
    '/pidgin/12345678',
    '/pidgin/test-494859.json',
    '/blah/test-49450859.json',
    '/pidgin/test-49450859',
    '/pidgin/test-49450859/.json',
    '/pidgin/test-494859.amp.json',
    // Below are legacy asset routes - should not match CPS routes
    '/sinhala/sri_lanka/2015/02/150218_mahinda_rally_sl.json',
    '/hausa/multimedia/2014/05/140528_hip_hop_40years_gallery.json',
  ];
  shouldNotMatchInvalidRoutes(inValidRoutes, cpsAssetPageDataPath);
});

describe('legacyAssetPagePath', () => {
  const validRoutes = [
    '/sinhala/sri_lanka/2015/02/150218_mahinda_rally_sl',
    '/hausa/multimedia/2014/05/140528_hip_hop_40years_gallery',
    '/zhongwen/simp/multimedia/2016/05/160511_vid_cultural_revolution_explainer',
    '/ukchina/simp/cool_britannia/people_in_uk/2016/09/160927_people_lord_mayor',
    '/ukchina/simp/elt/english_now/2014/12/141205_media_english_hiv',
  ];

  shouldMatchValidRoutes(validRoutes, legacyAssetPagePath);

  const inValidRoutes = [
    // Must be a 4 digit year after category
    '/sinhala/category/15/02/150218_mahinda_rally_sl',
    // Asset URI begin with a 6 digit date
    '/hausa/multimedia/2014/05/hip_hop_40years_gallery',
  ];
  shouldNotMatchInvalidRoutes(inValidRoutes, legacyAssetPagePath);
});

describe('legacyAssetPageDataPath', () => {
  const validRoutes = [
    '/sinhala/sri_lanka/2015/02/150218_mahinda_rally_sl.json',
    '/hausa/multimedia/2014/05/140528_hip_hop_40years_gallery.json',
  ];

  shouldMatchValidRoutes(validRoutes, legacyAssetPageDataPath);

  const inValidRoutes = [
    // Must be a 4 digit year after category
    '/sinhala/category/15/02/150218_mahinda_rally_sl.json',
    // Asset URI begin with a 6 digit date
    '/hausa/multimedia/2014/05/hip_hop_40years_gallery.json',
  ];
  shouldNotMatchInvalidRoutes(inValidRoutes, legacyAssetPageDataPath);
});
