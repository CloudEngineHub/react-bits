import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from '../../hooks/useForceRerender';
import PropTable from '../../components/common/Preview/PropTable';

import Stack from '../../content/Components/Stack/Stack';
import { stack } from '../../constants/code/Components/stackCode';

const StackDemo = () => {
  const [randomRotation, setRandomRotation] = useState(false);
  const [sensitivity, setSensitivity] = useState(200);
  const [autoplay, setAutoplay] = useState(false);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);
  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: 'randomRotation',
      type: 'boolean',
      default: false,
      description: "Applies a random rotation to each card for a 'messy' look."
    },
    {
      name: 'sensitivity',
      type: 'number',
      default: 200,
      description: 'Drag sensitivity for sending a card to the back.'
    },
    {
      name: 'sendToBackOnClick',
      type: 'boolean',
      default: 'false',
      description: 'When enabled, the stack also shifts to the next card on click.'
    },
    {
      name: 'cards',
      type: 'ReactNode[]',
      default: '[]',
      description: 'The array of card elements to display in the stack.'
    },
    {
      name: 'animationConfig',
      type: 'object',
      default: '{ stiffness: 260, damping: 20 }',
      description: "Configures the spring animation's stiffness and damping."
    },
    {
      name: 'autoplay',
      type: 'boolean',
      default: 'false',
      description: 'When enabled, the stack automatically cycles through cards.'
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      default: '3000',
      description: 'Delay in milliseconds between automatic card transitions.'
    }
  ];

  const images = [
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={400} overflow="hidden">
          <div style={{ width: 208, height: 208 }}>
            <Stack
              key={key}
              randomRotation={randomRotation}
              sensitivity={sensitivity}
              autoplay={autoplay}
              autoplayDelay={autoplayDelay}
              cards={images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`card-${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ))}
            />
          </div>
        </Box>

        <Customize>
          <PreviewSwitch
            title="Random Rotation"
            isChecked={randomRotation}
            onChange={checked => {
              setRandomRotation(checked);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Autoplay"
            isChecked={autoplay}
            onChange={checked => {
              setAutoplay(checked);
            }}
          />

          <PreviewSlider
            title="Sensitivity"
            min={100}
            max={300}
            step={10}
            value={sensitivity}
            onChange={val => {
              setSensitivity(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Autoplay Delay"
            min={1000}
            max={5000}
            step={500}
            value={autoplayDelay}
            onChange={val => {
              setAutoplayDelay(val);
            }}
            displayValue={val => `${val}ms`}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['motion']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={stack} />
      </CodeTab>
    </TabsLayout>
  );
};

export default StackDemo;
