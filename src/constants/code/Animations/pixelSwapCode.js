import code from '@content/Animations/PixelSwap/PixelSwap.jsx?raw';
import css from '@content/Animations/PixelSwap/PixelSwap.css?raw';
import tailwind from '@tailwind/Animations/PixelSwap/PixelSwap.jsx?raw';
import tsCode from '@ts-default/Animations/PixelSwap/PixelSwap.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/PixelSwap/PixelSwap.tsx?raw';

export const pixelSwap = {
  dependencies: ``,
  usage: `import PixelSwap from './PixelSwap';

<PixelSwap
  firstContent={
    <div className="click-prompt">
      <span>Click me</span>
    </div>
  }
  secondContent={
    <div className="found-message">
      <span>You found me</span>
    </div>
  }
  pixelSize={64}
  pixelColor="#120f17"
  reversePixelColor="#120f17"
  duration={3000}
  pixelDuration={600}
  pattern="random"
  trigger="click"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
