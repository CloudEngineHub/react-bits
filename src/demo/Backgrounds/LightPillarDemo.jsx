import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';

import LightPillar from '@/content/Backgrounds/LightPillar/LightPillar';
import { lightPillar } from '../../constants/code/Backgrounds/lightPillarCode';

const LightPillarDemo = () => {
  const [topColor, setTopColor] = useState('#5227FF');
  const [bottomColor, setBottomColor] = useState('#FF9FFC');
  const [intensity, setIntensity] = useState(1.0);
  const [rotationSpeed, setRotationSpeed] = useState(0.3);
  const [interactive, setInteractive] = useState(false);
  const [glowAmount, setGlowAmount] = useState(0.002);
  const [pillarWidth, setPillarWidth] = useState(3.0);
  const [pillarHeight, setPillarHeight] = useState(0.4);
  const [noiseIntensity, setNoiseIntensity] = useState(0.5);
  const [mixBlendMode, setMixBlendMode] = useState('screen');
  const [pillarRotation, setPillarRotation] = useState(25);

  const blendModeOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'screen', label: 'Screen' },
    { value: 'darken', label: 'Darken' },
    { value: 'lighten', label: 'Lighten' },
    { value: 'color-dodge', label: 'Color Dodge' },
    { value: 'luminosity', label: 'Luminosity' }
  ];

  const propData = [
    {
      name: 'topColor',
      type: 'string',
      default: "'#5227FF'",
      description: 'Hex color string for the top gradient color of the light pillar.'
    },
    {
      name: 'bottomColor',
      type: 'string',
      default: "'#FF9FFC'",
      description: 'Hex color string for the bottom gradient color of the light pillar.'
    },
    {
      name: 'intensity',
      type: 'number',
      default: '1.0',
      description: 'Controls the overall brightness and intensity of the effect.'
    },
    {
      name: 'rotationSpeed',
      type: 'number',
      default: '0.3',
      description: 'Speed multiplier for the pillar rotation animation.'
    },
    {
      name: 'interactive',
      type: 'boolean',
      default: 'false',
      description: 'Enable mouse interaction to control the pillar rotation.'
    },
    {
      name: 'glowAmount',
      type: 'number',
      default: '0.005',
      description: 'Controls the glow intensity and spread of the light effect.'
    },
    {
      name: 'pillarWidth',
      type: 'number',
      default: '3.0',
      description: 'Width/radius of the light pillar.'
    },
    {
      name: 'pillarHeight',
      type: 'number',
      default: '0.4',
      description: 'Height scaling factor for the pillar distortion.'
    },
    {
      name: 'noiseIntensity',
      type: 'number',
      default: '0.5',
      description: 'Intensity of the film grain noise postprocessing effect.'
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS class names to apply to the container element.'
    },
    {
      name: 'mixBlendMode',
      type: 'string',
      default: "'screen'",
      description: 'CSS mix-blend-mode property to control how the component blends with its background.'
    },
    {
      name: 'pillarRotation',
      type: 'number',
      default: '0',
      description: 'Rotation angle of the pillar in degrees (0-360).'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <LightPillar
            topColor={topColor}
            bottomColor={bottomColor}
            intensity={intensity}
            rotationSpeed={rotationSpeed}
            interactive={interactive}
            glowAmount={glowAmount}
            pillarWidth={pillarWidth}
            pillarHeight={pillarHeight}
            noiseIntensity={noiseIntensity}
            mixBlendMode={mixBlendMode}
            pillarRotation={pillarRotation}
          />
          <BackgroundContent pillText="New Background" headline="Ethereal light pillar for your hero sections." />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Top Color
            </Text>
            <Input type="color" value={topColor} onChange={e => setTopColor(e.target.value)} width="50px" />
          </Flex>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Bottom Color
            </Text>
            <Input type="color" value={bottomColor} onChange={e => setBottomColor(e.target.value)} width="50px" />
          </Flex>
          <PreviewSlider title="Intensity" min={0.1} max={3} step={0.1} value={intensity} onChange={setIntensity} />
          <PreviewSlider
            title="Rotation Speed"
            min={0}
            max={2}
            step={0.1}
            value={rotationSpeed}
            onChange={setRotationSpeed}
          />
          <PreviewSlider
            title="Glow Amount"
            min={0.001}
            max={0.02}
            step={0.001}
            value={glowAmount}
            onChange={setGlowAmount}
          />
          <PreviewSlider
            title="Pillar Width"
            min={1}
            max={10}
            step={0.1}
            value={pillarWidth}
            onChange={setPillarWidth}
          />
          <PreviewSlider
            title="Pillar Height"
            min={0.1}
            max={2}
            step={0.1}
            value={pillarHeight}
            onChange={setPillarHeight}
          />
          <PreviewSlider
            title="Noise Intensity"
            min={0}
            max={2}
            step={0.1}
            value={noiseIntensity}
            onChange={setNoiseIntensity}
          />
          <PreviewSlider
            title="Pillar Rotation"
            min={0}
            max={360}
            step={1}
            value={pillarRotation}
            onChange={setPillarRotation}
          />
          <PreviewSwitch title="Interactive" isChecked={interactive} onChange={() => setInteractive(!interactive)} />
          <PreviewSelect
            title="Mix Blend Mode"
            options={blendModeOptions}
            value={mixBlendMode}
            onChange={setMixBlendMode}
            width={150}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={lightPillar} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LightPillarDemo;
