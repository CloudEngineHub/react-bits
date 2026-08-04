import css from '@content/Components/MorphSlider/MorphSlider.css?raw';
import code from '@content/Components/MorphSlider/MorphSlider.jsx?raw';
import tailwind from '@tailwind/Components/MorphSlider/MorphSlider.jsx?raw';
import tsCode from '@ts-default/Components/MorphSlider/MorphSlider.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/MorphSlider/MorphSlider.tsx?raw';

export const morphSlider = {
  dependencies: `ogl gsap`,
  usage: `import MorphSlider from './MorphSlider'

const items = [
  { image: 'https://picsum.photos/seed/morph-a/1600/1000', caption: 'Northern Drift' },
  { image: 'https://picsum.photos/seed/morph-b/1200/1500', caption: 'Quiet Harbour' },
  { image: 'https://picsum.photos/seed/morph-c/1600/900', caption: 'Golden Ridge' }
]

<div style={{ height: '500px', position: 'relative' }}>
  <MorphSlider
    items={items}
    transition="melt"
    intensity={0.55}
    aberration={0.35}
    drift={0.4}
    autoplay
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
