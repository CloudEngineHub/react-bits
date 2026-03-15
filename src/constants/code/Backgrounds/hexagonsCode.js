import code from '@content/Backgrounds/Hexagons/Hexagons.jsx?raw';
import css from '@content/Backgrounds/Hexagons/Hexagons.css?raw';
import tailwind from '@tailwind/Backgrounds/Hexagons/Hexagons.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Hexagons/Hexagons.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Hexagons/Hexagons.tsx?raw';

export const hexagons = {
  usage: `import Hexagons from './Hexagons';
  
<Hexagons 
speed={0.5} 
hexSize={30}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
