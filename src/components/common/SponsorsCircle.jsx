import { Box } from '@chakra-ui/react';
import SimpleMarquee from './SimpleMarquee';
import '../../css/category.css';
import { platinumSponsors, goldSponsors, silverSponsors, hasAnySponsors } from '../../constants/Sponsors';

const SponsorsCircle = () => {
  const placeholderItems = Array.from({ length: 10 }, (_, i) => ({ id: `placeholder-${i}` }));

  if (!hasAnySponsors) {
    return (
      <div className="sponsors-marquee-container">
        <div className="sponsors-marquee-wrapper">
          <SimpleMarquee
            direction="left"
            baseVelocity={3}
            slowdownOnHover={false}
            repeat={4}
            className="overflow-hidden"
          >
            <Box className="flex" userSelect="none">
              {placeholderItems.map(item => (
                <div key={item.id} className="sponsor-item sponsor-item--gold sponsor-item--placeholder" />
              ))}
            </Box>
          </SimpleMarquee>
        </div>
      </div>
    );
  }

  return (
    <div className="sponsors-marquee-container">
      {/* Platinum Sponsors */}
      <div className="sponsors-marquee-wrapper">
        <SimpleMarquee
          direction="left"
          baseVelocity={16}
          slowdownOnHover={true}
          slowDownFactor={0.2}
          repeat={4}
          className="overflow-hidden"
        >
          <Box className="flex" userSelect="none">
            {platinumSponsors.map(sponsor => (
              <div key={sponsor.id} className="sponsor-item sponsor-item--platinum">
                <img src={sponsor.imageUrl} alt={sponsor.name} />
              </div>
            ))}
          </Box>
        </SimpleMarquee>
      </div>

      {/* Gold Sponsors */}
      <div className="sponsors-marquee-wrapper">
        <SimpleMarquee
          direction="right"
          baseVelocity={3}
          slowdownOnHover={true}
          slowDownFactor={0.2}
          repeat={4}
          className="overflow-hidden"
        >
          <Box mt={4} className="flex" userSelect="none">
            {goldSponsors.map(sponsor => (
              <div key={sponsor.id} className="sponsor-item sponsor-item--gold">
                <img src={sponsor.imageUrl} alt={sponsor.name} />
              </div>
            ))}
          </Box>
        </SimpleMarquee>
      </div>

      {/* Silver Sponsors */}
      <div className="sponsors-marquee-wrapper">
        <SimpleMarquee
          direction="left"
          baseVelocity={8}
          slowdownOnHover={true}
          slowDownFactor={0.2}
          repeat={4}
          className="overflow-hidden"
        >
          <Box mt={4} className="flex" userSelect="none">
            {silverSponsors.map(sponsor => (
              <div key={sponsor.id} className="sponsor-item sponsor-item--silver">
                <img src={sponsor.imageUrl} alt={sponsor.name} />
              </div>
            ))}
          </Box>
        </SimpleMarquee>
      </div>
    </div>
  );
};

export default SponsorsCircle;
