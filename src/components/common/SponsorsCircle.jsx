import { Box, Text } from '@chakra-ui/react';
import SimpleMarquee from './SimpleMarquee';
import '../../css/category.css';
import {
  diamondSponsors,
  platinumSponsors,
  silverSponsors,
  hasDiamondSponsors,
  hasPlatinumSponsors,
  hasSilverSponsors
} from '../../constants/Sponsors';

const DIAMOND_SLOTS = 2;
const PLATINUM_SLOTS = 5;
const SILVER_SLOTS = 10;

const buildSponsorUrl = (url, tier) => {
  if (!url) return null;
  try {
    const sponsorUrl = new URL(url);
    sponsorUrl.searchParams.set('utm_source', 'reactbits');
    sponsorUrl.searchParams.set('utm_medium', 'sponsor');
    sponsorUrl.searchParams.set('utm_campaign', tier);
    sponsorUrl.searchParams.set('ref', 'reactbits');
    return sponsorUrl.toString();
  } catch {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm_source=reactbits&utm_medium=sponsor&utm_campaign=${tier}&ref=reactbits`;
  }
};

const SponsorItem = ({ sponsor, tier }) => {
  const showTooltip = tier === 'platinum' || tier === 'silver';

  const content = (
    <div className={`sponsor-item sponsor-item--${tier}`} {...(showTooltip && { 'data-tooltip': sponsor.name })}>
      <img src={sponsor.imageUrl} alt={sponsor.name} />
    </div>
  );

  if (sponsor.url) {
    const trackedUrl = buildSponsorUrl(sponsor.url, tier);
    return (
      <a
        href={trackedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`sponsor-link${showTooltip ? ' sponsor-tooltip-wrapper' : ''}`}
      >
        {content}
      </a>
    );
  }

  return showTooltip ? <div className="sponsor-tooltip-wrapper">{content}</div> : content;
};

const TierSection = ({ label, availableSlots, children, hasSponsors }) => (
  <div className="sponsor-tier-section">
    <div className="sponsor-tier-header">
      <Text className="sponsor-tier-label">{label}</Text>
      {availableSlots > 0 && (
        <Text className="sponsor-tier-available">
          {availableSlots} {availableSlots === 1 ? 'spot left' : 'spots left'}
        </Text>
      )}
    </div>
    {hasSponsors && children}
  </div>
);

// Static sponsor row (no marquee) - used when < 5 sponsors
const StaticSponsorsRow = ({ sponsors, tier }) => {
  const isDiamond = tier === 'diamond';
  const isSingleSponsor = sponsors.length === 1;
  
  const className = [
    'static-sponsors-row',
    isDiamond && 'static-sponsors-row--diamond',
    isDiamond && isSingleSponsor && 'single-sponsor'
  ].filter(Boolean).join(' ');
  
  return (
    <div className={className}>
      {sponsors.map(sponsor => (
        <SponsorItem key={sponsor.id} sponsor={sponsor} tier={tier} />
      ))}
    </div>
  );
};

const MIN_FOR_MARQUEE = 5;

const SponsorsCircle = () => {
  const diamondAvailable = DIAMOND_SLOTS - diamondSponsors.length;
  const platinumAvailable = PLATINUM_SLOTS - platinumSponsors.length;
  const silverAvailable = SILVER_SLOTS - silverSponsors.length;

  const useDiamondMarquee = diamondSponsors.length >= MIN_FOR_MARQUEE;
  const usePlatinumMarquee = platinumSponsors.length >= MIN_FOR_MARQUEE;
  const useSilverMarquee = silverSponsors.length >= MIN_FOR_MARQUEE;

  return (
    <div className="sponsors-marquee-container">
      {/* Diamond Sponsors */}
      <TierSection label="Diamond" availableSlots={diamondAvailable} hasSponsors={hasDiamondSponsors}>
        {useDiamondMarquee ? (
          <div className="sponsors-marquee-wrapper">
            <SimpleMarquee
              direction="left"
              baseVelocity={4}
              slowdownOnHover={true}
              slowDownFactor={0.15}
              repeat={4}
              className="overflow-hidden"
            >
              <Box className="flex" userSelect="none">
                {diamondSponsors.map(sponsor => (
                  <SponsorItem key={sponsor.id} sponsor={sponsor} tier="diamond" />
                ))}
              </Box>
            </SimpleMarquee>
          </div>
        ) : (
          <StaticSponsorsRow sponsors={diamondSponsors} tier="diamond" />
        )}
      </TierSection>

      {/* Platinum Sponsors */}
      <TierSection label="Platinum" availableSlots={platinumAvailable} hasSponsors={hasPlatinumSponsors}>
        {usePlatinumMarquee ? (
          <div className="sponsors-marquee-wrapper">
            <SimpleMarquee
              direction="right"
              baseVelocity={3}
              slowdownOnHover={true}
              slowDownFactor={0.15}
              repeat={4}
              className="overflow-hidden"
            >
              <Box className="flex" userSelect="none">
                {platinumSponsors.map(sponsor => (
                  <SponsorItem key={sponsor.id} sponsor={sponsor} tier="platinum" />
                ))}
              </Box>
            </SimpleMarquee>
          </div>
        ) : (
          <StaticSponsorsRow sponsors={platinumSponsors} tier="platinum" />
        )}
      </TierSection>

      {/* Silver Sponsors */}
      <TierSection label="Silver" availableSlots={silverAvailable} hasSponsors={hasSilverSponsors}>
        {useSilverMarquee ? (
          <div className="sponsors-marquee-wrapper">
            <SimpleMarquee
              direction="left"
              baseVelocity={5}
              slowdownOnHover={true}
              slowDownFactor={0.15}
              repeat={4}
              className="overflow-hidden"
            >
              <Box className="flex" userSelect="none">
                {silverSponsors.map(sponsor => (
                  <SponsorItem key={sponsor.id} sponsor={sponsor} tier="silver" />
                ))}
              </Box>
            </SimpleMarquee>
          </div>
        ) : (
          <StaticSponsorsRow sponsors={silverSponsors} tier="silver" />
        )}
      </TierSection>
    </div>
  );
};

export default SponsorsCircle;
