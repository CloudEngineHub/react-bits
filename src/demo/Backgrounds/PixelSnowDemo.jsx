import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import PixelSnow from '../../content/Backgrounds/PixelSnow/PixelSnow';
import { pixelSnow } from '../../constants/code/Backgrounds/pixelSnowCode';

const PixelSnowDemo = () => {
  const [color, setColor] = useState('#ffffff');
  const [flakeSize, setFlakeSize] = useState(0.01);
  const [minFlakeSize] = useState(1.25);
  const [pixelResolution, setPixelResolution] = useState(200);
  const [speed, setSpeed] = useState(1.25);
  const [depthFade, setDepthFade] = useState(8);
  const [farPlane, setFarPlane] = useState(20);
  const [brightness, setBrightness] = useState(1);
  const [gamma] = useState(0.4545);
  const [density, setDensity] = useState(0.3);
  const [variant, setVariant] = useState('square');
  const [direction, setDirection] = useState(125);

  const variantOptions = [
    { label: 'Square', value: 'square' },
    { label: 'Round', value: 'round' }
  ];

  const propData = [
    {
      name: 'color',
      type: 'string',
      default: '"#ffffff"',
      description: 'Color of the snowflakes (hex or CSS color)'
    },
    {
      name: 'flakeSize',
      type: 'number',
      default: '0.01',
      description: 'Size of snowflakes in scene units'
    },
    {
      name: 'minFlakeSize',
      type: 'number',
      default: '1.25',
      description: 'Minimum flake size in pixels on screen'
    },
    {
      name: 'pixelResolution',
      type: 'number',
      default: '200',
      description: 'Pixel resolution - lower values create larger pixels for a more retro look'
    },
    {
      name: 'speed',
      type: 'number',
      default: '1.25',
      description: 'Animation speed multiplier'
    },
    {
      name: 'depthFade',
      type: 'number',
      default: '8',
      description: 'Depth fade intensity - higher values make distant flakes fade faster'
    },
    {
      name: 'farPlane',
      type: 'number',
      default: '20',
      description: 'Far plane distance for rendering - higher values show more distant flakes'
    },
    {
      name: 'brightness',
      type: 'number',
      default: '1',
      description: 'Overall brightness multiplier'
    },
    {
      name: 'gamma',
      type: 'number',
      default: '0.4545',
      description: 'Gamma correction value for final color output'
    },
    {
      name: 'density',
      type: 'number',
      default: '0.3',
      description: 'Probability of snowflakes appearing (0-1) - lower values = fewer flakes'
    },
    {
      name: 'variant',
      type: '"square" | "round"',
      default: '"square"',
      description: 'Shape of the snowflakes - square or round (circles remain pixelated)'
    },
    {
      name: 'direction',
      type: 'number',
      default: '125',
      description: 'Wind direction angle in degrees (0-360)'
    },
    {
      name: 'className',
      type: 'string',
      default: '""',
      description: 'Additional CSS class name'
    },
    {
      name: 'style',
      type: 'object',
      default: '{}',
      description: 'Additional inline styles'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" p={0}>
          <PixelSnow
            color={color}
            flakeSize={flakeSize}
            minFlakeSize={minFlakeSize}
            pixelResolution={pixelResolution}
            speed={speed}
            depthFade={depthFade}
            farPlane={farPlane}
            brightness={brightness}
            gamma={gamma}
            density={density}
            variant={variant}
            direction={direction}
          />

          <BackgroundContent headline="Oh, the weather outside is frightful!" pillText="New Background" />
        </Box>

        <Customize>
          <PreviewSelect title="Variant" options={variantOptions} value={variant} onChange={setVariant} width={120} />

          <Flex alignItems="center" mb={4} mt={4}>
            <Text fontSize="sm" mr={2}>
              Color
            </Text>
            <Input
              type="color"
              value={color}
              onChange={e => {
                setColor(e.target.value);
              }}
              width="50px"
            />
          </Flex>

          <PreviewSlider
            title="Pixel Resolution"
            min={50}
            max={500}
            step={10}
            value={pixelResolution}
            onChange={setPixelResolution}
            width={200}
          />

          <PreviewSlider title="Speed" min={0} max={5} step={0.1} value={speed} onChange={setSpeed} width={200} />

          <PreviewSlider
            title="Density"
            min={0.1}
            max={1}
            step={0.05}
            value={density}
            onChange={setDensity}
            width={200}
          />

          <PreviewSlider
            title="Flake Size"
            min={0.001}
            max={0.05}
            step={0.001}
            value={flakeSize}
            onChange={setFlakeSize}
            width={200}
          />

          <PreviewSlider
            title="Brightness"
            min={0.1}
            max={3}
            step={0.1}
            value={brightness}
            onChange={setBrightness}
            width={200}
          />

          <PreviewSlider
            title="Depth Fade"
            min={1}
            max={20}
            step={0.5}
            value={depthFade}
            onChange={setDepthFade}
            width={200}
          />

          <PreviewSlider
            title="Far Plane"
            min={5}
            max={50}
            step={1}
            value={farPlane}
            onChange={setFarPlane}
            width={200}
          />

          <PreviewSlider
            title="Direction"
            min={0}
            max={360}
            step={5}
            value={direction}
            onChange={setDirection}
            valueUnit="°"
            width={200}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={pixelSnow} />
      </CodeTab>
    </TabsLayout>
  );
};

export default PixelSnowDemo;
