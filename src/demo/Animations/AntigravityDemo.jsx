import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '@/components/code/Dependencies';
import CodeExample from '@/components/code/CodeExample';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import useForceRerender from '../../hooks/useForceRerender';

import { antigravity } from '@/constants/code/Animations/antigravityCode';
import Antigravity from '../../ts-default/Animations/Antigravity/Antigravity';

const AntigravityDemo = () => {
  const [magnetRadius, setMagnetRadius] = useState(6);
  const [ringRadius, setRingRadius] = useState(7);
  const [waveSpeed, setWaveSpeed] = useState(0.4);
  const [waveAmplitude, setWaveAmplitude] = useState(1);
  const [particleSize, setParticleSize] = useState(1.5);
  const [lerpSpeed, setLerpSpeed] = useState(0.05);
  const [count, setCount] = useState(300);
  const [color, setColor] = useState('#5227FF');
  const [autoAnimate, setAutoAnimate] = useState(true);
  const [particleVariance, setParticleVariance] = useState(1);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [depthFactor, setDepthFactor] = useState(1);
  const [pulseSpeed, setPulseSpeed] = useState(3);
  const [particleShape, setParticleShape] = useState('capsule');
  const [fieldStrength, setFieldStrength] = useState(10);

  const [key, forceRerender] = useForceRerender();

  useEffect(() => {
    forceRerender();
  }, [
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    count,
    color,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength
  ]);

  const propData = [
    {
      name: 'count',
      type: 'number',
      default: '300',
      description: 'Number of particles'
    },
    {
      name: 'magnetRadius',
      type: 'number',
      default: '10',
      description: 'Radius of the magnetic field'
    },
    {
      name: 'ringRadius',
      type: 'number',
      default: '10',
      description: 'Radius of the formed ring'
    },
    {
      name: 'waveSpeed',
      type: 'number',
      default: '0.4',
      description: 'Speed of the wave animation'
    },
    {
      name: 'waveAmplitude',
      type: 'number',
      default: '1',
      description: 'Intensity of the wave (0 for perfect circle)'
    },
    {
      name: 'particleSize',
      type: 'number',
      default: '2',
      description: 'Scale multiplier for particles'
    },
    {
      name: 'lerpSpeed',
      type: 'number',
      default: '0.1',
      description: 'How fast particles move to the ring'
    },
    {
      name: 'color',
      type: 'string',
      default: '#FF9FFC',
      description: 'Color of the particles'
    },
    {
      name: 'autoAnimate',
      type: 'boolean',
      default: 'false',
      description: 'Automatically animate when idle'
    },
    {
      name: 'particleVariance',
      type: 'number',
      default: '1',
      description: 'Variance in particle size (0-1)'
    },
    {
      name: 'rotationSpeed',
      type: 'number',
      default: '0',
      description: 'Rotation speed of the ring'
    },
    {
      name: 'depthFactor',
      type: 'number',
      default: '1',
      description: 'Z-axis depth multiplier'
    },
    {
      name: 'pulseSpeed',
      type: 'number',
      default: '3',
      description: 'Speed of particle size pulsation'
    },
    {
      name: 'particleShape',
      type: 'string',
      default: 'capsule',
      description: 'Shape of the particles'
    },
    {
      name: 'fieldStrength',
      type: 'number',
      default: '10',
      description: 'Tightness of the ring formation'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" p={0}>
          <Antigravity
            key={key}
            count={count}
            magnetRadius={magnetRadius}
            ringRadius={ringRadius}
            waveSpeed={waveSpeed}
            waveAmplitude={waveAmplitude}
            particleSize={particleSize}
            lerpSpeed={lerpSpeed}
            color={color}
            autoAnimate={autoAnimate}
            particleVariance={particleVariance}
            rotationSpeed={rotationSpeed}
            depthFactor={depthFactor}
            pulseSpeed={pulseSpeed}
            particleShape={particleShape}
            fieldStrength={fieldStrength}
          />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
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
          <PreviewSelect
            title="Particle Shape"
            options={[
              { value: 'capsule', label: 'Capsule' },
              { value: 'sphere', label: 'Sphere' },
              { value: 'box', label: 'Box' },
              { value: 'tetrahedron', label: 'Tetrahedron' }
            ]}
            value={particleShape}
            onChange={setParticleShape}
            width={150}
          />
          <PreviewSlider
            title="Magnet Radius"
            min={5}
            max={50}
            step={1}
            value={magnetRadius}
            onChange={setMagnetRadius}
          />
          <PreviewSlider title="Ring Radius" min={5} max={25} step={1} value={ringRadius} onChange={setRingRadius} />
          <PreviewSlider title="Wave Speed" min={0} max={5} step={0.1} value={waveSpeed} onChange={setWaveSpeed} />
          <PreviewSlider
            title="Wave Amplitude"
            min={0}
            max={5}
            step={0.1}
            value={waveAmplitude}
            onChange={setWaveAmplitude}
          />
          <PreviewSlider
            title="Particle Size"
            min={0.1}
            max={2}
            step={0.1}
            value={particleSize}
            onChange={setParticleSize}
          />
          <PreviewSlider
            title="Particle Variance"
            min={0}
            max={1}
            step={0.1}
            value={particleVariance}
            onChange={setParticleVariance}
          />
          <PreviewSlider
            title="Lerp Speed"
            min={0.01}
            max={0.2}
            step={0.01}
            value={lerpSpeed}
            onChange={setLerpSpeed}
          />
          <PreviewSlider title="Count" min={100} max={5000} step={100} value={count} onChange={setCount} />
          <PreviewSlider
            title="Rotation Speed"
            min={0}
            max={5}
            step={0.1}
            value={rotationSpeed}
            onChange={setRotationSpeed}
          />
          <PreviewSlider
            title="Depth Factor"
            min={0}
            max={5}
            step={0.1}
            value={depthFactor}
            onChange={setDepthFactor}
          />
          <PreviewSlider title="Pulse Speed" min={0} max={10} step={0.1} value={pulseSpeed} onChange={setPulseSpeed} />
          <PreviewSlider
            title="Field Strength"
            min={0.1}
            max={20}
            step={0.1}
            value={fieldStrength}
            onChange={setFieldStrength}
          />

          <PreviewSwitch title="Auto Animate" isChecked={autoAnimate} onChange={setAutoAnimate} />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['@react-three/fiber', 'three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={antigravity} />
      </CodeTab>
    </TabsLayout>
  );
};

export default AntigravityDemo;
