import { useCallback, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PixelSwap from '../../content/Animations/PixelSwap/PixelSwap';
import { pixelSwap } from '../../constants/code/Animations/pixelSwapCode';
import './PixelSwapDemo.css';

const DEFAULT_PROPS = {
  pixelSize: 64,
  enterColor: '#ffffff',
  exitColor: 'var(--bg-body)',
  duration: 3000,
  pixelDuration: 600,
  pattern: 'random'
};

const propData = [
  { name: 'firstContent', type: 'ReactNode', default: '—', description: 'Content shown in the initial state.' },
  { name: 'secondContent', type: 'ReactNode', default: '—', description: 'Content revealed after the pixel cover.' },
  {
    name: 'pixelSize',
    type: 'number',
    default: '64',
    description: 'Square pixel edge length in pixels.'
  },
  {
    name: 'pixelColor',
    type: 'string',
    default: '#ffffff',
    description: 'Pixel color when revealing the second content.'
  },
  {
    name: 'reversePixelColor',
    type: 'string',
    default: 'pixelColor',
    description: 'Pixel color used for the reverse transition.'
  },
  { name: 'duration', type: 'number', default: '3000', description: 'Total transition duration in milliseconds.' },
  {
    name: 'pixelDuration',
    type: 'number',
    default: '600',
    description: 'Animation duration of each individual pixel in milliseconds.'
  },
  {
    name: 'pattern',
    type: '"random" | "center" | "edges" | "left-to-right" | "right-to-left" | "top-to-bottom"',
    default: 'random',
    description: 'Order in which pixels animate.'
  },
  {
    name: 'easing',
    type: 'string',
    default: 'cubic-bezier(...)',
    description: 'Easing used by both pixel animation phases.'
  },
  {
    name: 'trigger',
    type: '"hover" | "click" | "manual"',
    default: 'hover',
    description: 'Interaction that requests a content swap.'
  },
  {
    name: 'initialActive',
    type: 'boolean',
    default: 'false',
    description: 'Whether the second content is initially visible.'
  },
  {
    name: 'active',
    type: 'boolean',
    default: '—',
    description: 'Controlled active state. Use with trigger="manual" for external control.'
  },
  {
    name: 'onActiveChange',
    type: '(active: boolean) => void',
    default: '—',
    description: 'Called whenever an interaction requests a state change.'
  },
  { name: 'aspectRatio', type: 'string', default: '16 / 10', description: 'CSS aspect-ratio value for the wrapper.' },
  { name: 'className', type: 'string', default: '—', description: 'Additional class names for the wrapper.' },
  { name: 'style', type: 'CSSProperties', default: '—', description: 'Inline styles for the wrapper.' }
];

const PixelSwapDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const { pixelSize, enterColor, exitColor, duration, pixelDuration, pattern } = props;
  const [revealOpacity, setRevealOpacity] = useState(1);
  const [promptOpacity, setPromptOpacity] = useState(1);
  const fadeRef = useRef(null);

  const handleActiveChange = useCallback((next) => {
    if (fadeRef.current) clearTimeout(fadeRef.current);
    if (next) {
      setRevealOpacity(0);
    } else {
      setPromptOpacity(0);
    }
    fadeRef.current = setTimeout(() => {
      if (next) setRevealOpacity(1);
      else setPromptOpacity(1);
    }, Math.max(200, duration) + 500);
  }, [duration]);

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box className="demo-container" minH={500} p={{ base: 4, md: 8 }}>
            <PixelSwap
              firstContent={
                <div className="pixel-swap-demo__panel pixel-swap-demo__prompt">
                  <span style={{ opacity: promptOpacity, transition: 'opacity 0.5s' }}>Use reactbits</span>
                </div>
              }
              secondContent={
                <div className="pixel-swap-demo__panel pixel-swap-demo__reveal">
                  <span style={{ opacity: revealOpacity, transition: 'opacity 0.5s' }}>Build anything</span>
                </div>
              }
              pixelSize={pixelSize}
              pixelColor={enterColor}
              reversePixelColor={exitColor}
              duration={duration}
              pixelDuration={pixelDuration}
              pattern={pattern}
              onActiveChange={handleActiveChange}
              className="pixel-swap-demo"
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Pattern"
              value={pattern}
              width={160}
              options={[
                { label: 'Random', value: 'random' },
                { label: 'Center Out', value: 'center' },
                { label: 'Edges In', value: 'edges' },
                { label: 'Left to Right', value: 'left-to-right' },
                { label: 'Right to Left', value: 'right-to-left' },
                { label: 'Top to Bottom', value: 'top-to-bottom' }
              ]}
              onChange={value => updateProp('pattern', value)}
            />
            <PreviewSlider
              title="Pixel Size"
              min={24}
              max={120}
              step={4}
              value={pixelSize}
              valueUnit="px"
              onChange={value => updateProp('pixelSize', value)}
            />
            <PreviewSlider
              title="Duration"
              min={2500}
              max={6000}
              step={100}
              value={duration}
              valueUnit="ms"
              onChange={value => updateProp('duration', value)}
            />
            <PreviewSlider
              title="Pixel Duration"
              min={100}
              max={800}
              step={50}
              value={pixelDuration}
              valueUnit="ms"
              onChange={value => updateProp('pixelDuration', value)}
            />
            <PreviewColorPickerCustom
              title="Reveal Pixels"
              color={enterColor}
              onChange={value => updateProp('enterColor', value)}
            />
            <PreviewColorPickerCustom
              title="Return Pixels"
              color={exitColor}
              onChange={value => updateProp('exitColor', value)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={[]} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={pixelSwap} componentName="PixelSwap" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PixelSwapDemo;
