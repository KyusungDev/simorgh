import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Radio Schedule', () => {
    const hasRadioSchedule = service === 'arabic';
    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      it('should be in the document', () => {
        expect(id).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(id).not.toBeInTheDocument();
      });
    }
  });
};

describe('Ads', () => {
  const hasAds = service === 'arabic';
  const leaderboardEl = document.getElementById('dotcom-leaderboard');
  const mpuEl = document.getElementById('dotcom-mpu');

  if (hasAds) {
    it('ad should be in the document', () => {
      expect(leaderboardEl).toBeInTheDocument();
      expect(mpuEl).toBeInTheDocument();
    });
  } else {
    it('ad should not be in the document', () => {
      expect(leaderboardEl).not.toBeInTheDocument();
      expect(mpuEl).not.toBeInTheDocument();
    });
  }
});
