import { useRef, useEffect } from 'react';

const Hexagons = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  hexSize = 30,
  hoverFillColor = '#222'
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredHex = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const horiz = hexSize * 1.5;
    const vert = hexSize * Math.sqrt(3);

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawHex = (cx, cy, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const pixelToHex = (px, py) => {
      const col = Math.round(px / horiz);
      const rowOffset = col % 2 !== 0 ? vert / 2 : 0;
      const row = Math.round((py - rowOffset) / vert);
      return { col, row };
    };

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const offsetX = ((gridOffset.current.x % horiz) + horiz) % horiz;
      const offsetY = ((gridOffset.current.y % vert) + vert) % vert;

      const cols = Math.ceil(canvas.width / horiz) + 3;
      const rows = Math.ceil(canvas.height / vert) + 3;

      for (let col = -2; col < cols; col++) {
        for (let row = -2; row < rows; row++) {
          const cx = col * horiz + offsetX;
          const cy = row * vert + (col % 2 !== 0 ? vert / 2 : 0) + offsetY;

          if (
            hoveredHex.current &&
            hoveredHex.current.col === col &&
            hoveredHex.current.row === row
          ) {
            drawHex(cx, cy, hexSize);
            ctx.fillStyle = hoverFillColor;
            ctx.fill();
          }

          drawHex(cx, cy, hexSize);
          ctx.strokeStyle = borderColor;
          ctx.stroke();
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, '#060010');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + horiz) % horiz;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + horiz) % horiz;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + vert) % vert;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + vert) % vert;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + horiz) % horiz;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + vert) % vert;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const offsetX = ((gridOffset.current.x % horiz) + horiz) % horiz;
      const offsetY = ((gridOffset.current.y % vert) + vert) % vert;

      const adjustedX = mouseX - offsetX;
      const adjustedY = mouseY - offsetY;

      const hex = pixelToHex(adjustedX, adjustedY);

      if (
        !hoveredHex.current ||
        hoveredHex.current.col !== hex.col ||
        hoveredHex.current.row !== hex.row
      ) {
        hoveredHex.current = hex;
      }
    };

    const handleMouseLeave = () => {
      hoveredHex.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, hexSize]);

  return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
};

export default Hexagons;
