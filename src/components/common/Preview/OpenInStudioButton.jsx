import { Button, Icon } from '@chakra-ui/react';
import { Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Button to open the current background configuration in Background Studio
 * @param {string} backgroundId - The background ID (e.g., 'aurora', 'silk')
 * @param {object} currentProps - Current props values (in BG Studio format)
 * @param {object} defaultProps - Default props values from BG Studio (to exclude unchanged values from URL)
 */
const OpenInStudioButton = ({ backgroundId, currentProps = {}, defaultProps = {} }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Filter out props that match defaults
    const changedProps = {};
    Object.keys(currentProps).forEach(key => {
      if (JSON.stringify(currentProps[key]) !== JSON.stringify(defaultProps[key])) {
        changedProps[key] = currentProps[key];
      }
    });

    // Build URL params
    let url = `/tools/background-studio?bg=${backgroundId}`;
    if (Object.keys(changedProps).length > 0) {
      url += `&props=${encodeURIComponent(JSON.stringify(changedProps))}`;
    }

    navigate(url);
  };

  return (
    <Button
      size="sm"
      position="absolute"
      mt={3.5}
      variant="outline"
      color="#ffffff"
      bg="#5227FF"
      fontWeight={500}
      borderRadius="50px"
      fontSize="14px"
      onClick={handleClick}
      _hover={{ color: '#fff', bg: '#5227FFaa' }}
    >
      <Icon as={Palette} boxSize={4} /> Open in BG Studio
    </Button>
  );
};

export default OpenInStudioButton;
