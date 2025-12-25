import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useDebounce } from 'react-haiku';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';

import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PropTable from '../../components/common/Preview/PropTable';

import { orb } from '../../constants/code/Backgrounds/orbCode';
import Orb from '../../content/Backgrounds/Orb/Orb';

const OrbDemo = () => {
  const [hue, setHue] = useState(0);
  const [hoverIntensity, setHoverIntensity] = useState(2);
  const [rotateOnHover, setRotateOnHover] = useState(true);
  const [forceHoverState, setForceHoverState] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  const debouncedHue = useDebounce(hue, 300);
  const debouncedHoverIntensity = useDebounce(hoverIntensity, 300);

  const propData = [
    {
      name: 'hue',
      type: 'number',
      default: '0',
      description: 'The base hue for the orb (in degrees).'
    },
    {
      name: 'hoverIntensity',
      type: 'number',
      default: '0.2',
      description: 'Controls the intensity of the hover distortion effect.'
    },
    {
      name: 'rotateOnHover',
      type: 'boolean',
      default: 'true',
      description: 'Toggle to enable or disable continuous rotation on hover.'
    },
    {
      name: 'forceHoverState',
      type: 'boolean',
      default: 'false',
      description: 'Force hover animations even when the orb is not actually hovered.'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      default: '#000000',
      description: 'The background color of the container.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <Orb
            hoverIntensity={debouncedHoverIntensity}
            rotateOnHover={rotateOnHover}
            hue={debouncedHue}
            forceHoverState={forceHoverState}
            backgroundColor={backgroundColor}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent pillText="New Background" headline="This orb is hiding something, try hovering!" />
        </Box>

        <Customize>
          <PreviewSlider title="Hue Shift" min={0} max={360} step={1} value={hue} onChange={setHue} />

          <PreviewSlider
            title="Hover Intensity"
            min={0}
            max={5}
            step={0.01}
            value={hoverIntensity}
            onChange={setHoverIntensity}
          />

          <PreviewSwitch
            title="Rotate On Hover"
            isChecked={rotateOnHover}
            onChange={checked => setRotateOnHover(checked)}
          />

          <PreviewSwitch
            title="Force Hover State"
            isChecked={forceHoverState}
            onChange={checked => setForceHoverState(checked)}
          />

          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Orb Background Color
            </Text>
            <Input
              type="color"
              value={backgroundColor}
              onChange={e => setBackgroundColor(e.target.value)}
              width="50px"
            />
          </Flex>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={orb} />
      </CodeTab>
    </TabsLayout>
  );
};

export default OrbDemo;
