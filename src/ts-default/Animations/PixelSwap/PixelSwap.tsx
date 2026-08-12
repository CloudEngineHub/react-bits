import { CSSProperties, KeyboardEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './PixelSwap.css';

type Trigger = 'hover' | 'click' | 'manual';
type Pattern = 'random' | 'center' | 'edges' | 'left-to-right' | 'right-to-left' | 'top-to-bottom';

interface PixelSwapProps {
  firstContent: ReactNode;
  secondContent: ReactNode;
  pixelSize?: number;
  pixelColor?: string;
  reversePixelColor?: string;
  duration?: number;
  pixelDuration?: number;
  pattern?: Pattern;
  easing?: string;
  trigger?: Trigger;
  initialActive?: boolean;
  active?: boolean;
  onActiveChange?: (active: boolean) => void;
  aspectRatio?: string;
  className?: string;
  style?: CSSProperties;
}

const makePixels = (rows: number, columns: number, pattern: Pattern) =>
  Array.from({ length: rows * columns }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const x = columns <= 1 ? 0 : column / (columns - 1);
    const y = rows <= 1 ? 0 : row / (rows - 1);
    const centerDistance = Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2;
    const edgeDistance = Math.min(x, 1 - x, y, 1 - y) * 2;
    const order =
      pattern === 'center'
        ? centerDistance
        : pattern === 'edges'
          ? edgeDistance
          : pattern === 'left-to-right'
            ? x
            : pattern === 'right-to-left'
              ? 1 - x
              : pattern === 'top-to-bottom'
                ? y
                : null;

    return {
      id: index,
      enter: order ?? ((index * 73 + index * index * 17) % 101) / 100,
      exit: order ?? ((index * 31 + index * index * 11) % 101) / 100
    };
  });

function PixelSwap({
  firstContent,
  secondContent,
  pixelSize = 64,
  pixelColor = '#ffffff',
  reversePixelColor,
  duration = 3000,
  pixelDuration = 600,
  pattern = 'random',
  easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
  trigger = 'hover',
  initialActive = false,
  active,
  onActiveChange,
  aspectRatio = '16 / 10',
  className = '',
  style
}: PixelSwapProps) {
  const [internalActive, setInternalActive] = useState(initialActive);
  const [shownActive, setShownActive] = useState(active ?? initialActive);
  const [direction, setDirection] = useState<boolean | null>(null);
  const [grid, setGrid] = useState({ rows: 8, columns: 13, cellSize: 64 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const animationsRef = useRef<Animation[]>([]);
  const timerRefs = useRef<number[]>([]);
  const desiredActive = active ?? internalActive;
  const size = Math.max(8, Math.round(pixelSize));
  const pixels = useMemo(() => makePixels(grid.rows, grid.columns, pattern), [grid, pattern]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateGrid = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      setGrid({ rows: Math.ceil(height / size), columns: Math.ceil(width / size), cellSize: size });
    };

    updateGrid();
    const observer = new ResizeObserver(updateGrid);
    observer.observe(container);
    return () => observer.disconnect();
  }, [size]);

  const clearTransition = useCallback(() => {
    animationsRef.current.forEach(animation => animation.cancel());
    timerRefs.current.forEach(timer => window.clearTimeout(timer));
    animationsRef.current = [];
    timerRefs.current = [];
  }, []);

  useEffect(() => clearTransition, [clearTransition]);

  useEffect(() => {
    if (direction !== null || desiredActive === shownActive) return;
    setDirection(desiredActive);
  }, [desiredActive, direction, shownActive]);

  useEffect(() => {
    if (direction === null) return;

    clearTransition();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setShownActive(direction);
      setDirection(null);
      return;
    }

    const total = Math.max(200, duration);
    const blockDuration = Math.min(Math.max(100, pixelDuration), total * 0.32);
    const swapAt = total * 0.64;
    const maxEnterDelay = Math.max(0, swapAt - blockDuration);
    const maxExitDelay = Math.max(0, total - swapAt - blockDuration);

    pixelRefs.current.forEach((pixel, index) => {
      if (!pixel) return;
      const data = pixels[index];
      pixel.style.backgroundColor = direction ? pixelColor : (reversePixelColor ?? pixelColor);
      const enterAnimation = pixel.animate(
        [
          { opacity: 0, transform: 'scale(0.2)' },
          { opacity: 1, transform: 'scale(1.03)' }
        ],
        { duration: blockDuration, delay: data.enter * maxEnterDelay, easing, fill: 'both' }
      );
      const exitAnimation = pixel.animate(
        [
          { opacity: 1, transform: 'scale(1.03)' },
          { opacity: 0, transform: 'scale(0.15)' }
        ],
        { duration: blockDuration, delay: swapAt + data.exit * maxExitDelay, easing, fill: 'forwards' }
      );
      animationsRef.current.push(enterAnimation, exitAnimation);
    });

    timerRefs.current.push(
      window.setTimeout(() => {
        setShownActive(direction);
        setDirection(null);
      }, total)
    );
  }, [clearTransition, direction, duration, easing, pixelColor, pixelDuration, pixels, reversePixelColor]);

  const requestActive = (next: boolean) => {
    if (active === undefined) setInternalActive(next);
    onActiveChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      requestActive(!desiredActive);
    }
  };

  const interactionProps =
    trigger === 'hover'
      ? {
          onMouseEnter: () => requestActive(true),
          onMouseLeave: () => requestActive(false),
          onFocus: () => requestActive(true),
          onBlur: () => requestActive(false),
          tabIndex: 0
        }
      : trigger === 'click'
        ? {
            onClick: () => requestActive(!desiredActive),
            onKeyDown: handleKeyDown,
            role: 'button',
            tabIndex: 0
          }
        : {};

  return (
    <div
      ref={containerRef}
      className={`pixel-swap ${className}`}
      style={{ aspectRatio, ...style }}
      data-active={shownActive}
      data-transitioning={direction !== null}
      {...interactionProps}
    >
      <div className="pixel-swap__content" aria-hidden={shownActive}>
        {firstContent}
      </div>
      <div className="pixel-swap__content" aria-hidden={!shownActive}>
        {secondContent}
      </div>
      {direction !== null && (
        <div
          className="pixel-swap__grid"
          style={{
            gridTemplateColumns: `repeat(${grid.columns}, ${grid.cellSize}px)`,
            gridTemplateRows: `repeat(${grid.rows}, ${grid.cellSize}px)`,
            width: grid.columns * grid.cellSize,
            height: grid.rows * grid.cellSize
          }}
          aria-hidden="true"
        >
          {pixels.map((pixel, index) => (
            <span
              key={pixel.id}
              ref={element => {
                pixelRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PixelSwap;
