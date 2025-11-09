import { Box, Text } from '@chakra-ui/react';

import { hasAnySponsors } from '../../constants/Sponsors';
import SponsorsCircle from './SponsorsCircle';

const SponsorsCard = () => {
  return (
    <Box className="right-card">
      <Box p="1em 1em">
        <Text lineHeight={0} mt=".6em" mb="1.2em" fontWeight={600} fontSize="18px" color="#B19EEF">
          Sponsors
        </Text>
        <Text mt="0.5em" fontSize="14px" color="#cccccc">
          These awesome people are helping React Bits grow.
        </Text>
      </Box>

      <SponsorsCircle />

      <Box px="1em" pb="1em" mt="1em">
        <a href="mailto:contact@davidhaz.com">
          <button className="sponsor-button">{hasAnySponsors ? 'Become A Sponsor' : 'Be The First'}</button>
        </a>
      </Box>
    </Box>
  );
};

export default SponsorsCard;
