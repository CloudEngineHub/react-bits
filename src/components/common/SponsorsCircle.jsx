import { Box, Text } from '@chakra-ui/react';
import SimpleMarquee from './SimpleMarquee';
import '../../css/category.css';
import { diamondSponsors, platinumSponsors, silverSponsors, hasSponsors } from '../../constants/Sponsors';

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
    // If URL parsing fails, append params manually
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm_source=reactbits&utm_medium=sponsor&utm_campaign=${tier}&ref=reactbits`;
  }
};

const SponsorItem = ({ sponsor, tier, isPlaceholder = false }) => {
  const content = (
    <div
      className={`sponsor-item sponsor-item--${tier}${isPlaceholder || !sponsor.imageUrl ? ' sponsor-item--placeholder' : ''}`}
    >
      {sponsor.imageUrl && !isPlaceholder && <img src={sponsor.imageUrl} alt={sponsor.name} title={sponsor.name} />}
    </div>
  );

  if (sponsor.url && !isPlaceholder) {
    const trackedUrl = buildSponsorUrl(sponsor.url, tier);
    return (
      <a href={trackedUrl} target="_blank" rel="noopener noreferrer" className="sponsor-link">
        {content}
      </a>
    );
  }

  return content;
};

const TierSection = ({ label, children, showLabel = true }) => (
  <div className="sponsor-tier-section">
    {showLabel && <Text className="sponsor-tier-label">{label}</Text>}
    {children}
  </div>
);

const SponsorsCircle = () => {
  const placeholderItems = Array.from({ length: 8 }, (_, i) => ({ id: `placeholder-${i}` }));

  if (!hasSponsors) {
    return (
      <div className="sponsors-marquee-container sponsors-empty">
        <div className="sponsors-marquee-wrapper">
          <SimpleMarquee
            direction="left"
            baseVelocity={2}
            slowdownOnHover={false}
            repeat={4}
            className="overflow-hidden"
          >
            <Box className="flex" userSelect="none">
              {placeholderItems.map(item => (
                <div key={item.id} className="sponsor-item sponsor-item--platinum sponsor-item--placeholder" />
              ))}
            </Box>
          </SimpleMarquee>
        </div>
        <Text className="sponsors-empty-text">Your logo here</Text>
      </div>
    );
  }

  return (
    <div className="sponsors-marquee-container">
      {/* Diamond Sponsors */}
      {diamondSponsors.length > 0 && (
        <TierSection label="Diamond">
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
        </TierSection>
      )}

      {/* Platinum Sponsors */}
      {platinumSponsors.length > 0 && (
        <TierSection label="Platinum">
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
        </TierSection>
      )}

      {/* Silver Sponsors */}
      {silverSponsors.length > 0 && (
        <TierSection label="Silver">
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
        </TierSection>
      )}
    </div>
  );
};

export default SponsorsCircle;
