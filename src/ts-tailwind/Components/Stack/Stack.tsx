import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  setDragging: (isDragging: boolean) => void;
}

function CardRotate({ children, onSendToBack, sensitivity, setDragging }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: any, info: PanInfo) {
    setDragging(false);
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full cursor-grab"
      style={{ x, y, rotateX, rotateY, zIndex: 1 }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragStart={() => setDragging(true)}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  children: React.ReactNode;
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  animationConfig?: { stiffness: number; damping: number };
  className?: string;
}

export default function Stack({
  children,
  randomRotation = false,
  sensitivity = 200,
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  animationConfig = { stiffness: 260, damping: 20 },
  className = '',
}: StackProps) {
  const childrenArray = React.Children.toArray(children);

  const [order, setOrder] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setOrder((prevOrder) => {
      const newIndices = childrenArray.map((_, i) => i);

      if (prevOrder.length === newIndices.length) {
        return prevOrder;
      }
      return newIndices;
    });
  }, [childrenArray.length]);

  const sendToBack = useCallback(() => {
    setOrder((prev) => {
      const newOrder = [...prev];
      const lastItem = newOrder.pop();
      if (lastItem !== undefined) {
        newOrder.unshift(lastItem);
      }
      return newOrder;
    });
  }, []);

  useEffect(() => {
    if (!autoplay || isPaused || isDragging) return;
    const interval = setInterval(() => {
      sendToBack();
    }, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused, isDragging, sendToBack]);

  const randomRotations = useMemo(() => {
    return childrenArray.map(() => (randomRotation ? Math.random() * 10 - 5 : 0));
  }, [childrenArray.length, randomRotation]);

  return (
    <div
      className={`relative h-full w-full ${className}`}
      style={{ perspective: 600 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {order.map((childIndex, index) => {
        const child = childrenArray[childIndex];
        const isTop = index === order.length - 1;
        const reverseIndex = order.length - 1 - index;
        return (
          <motion.div
            key={childIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              rotateZ: reverseIndex * 4 + randomRotations[childIndex],
              scale: 1 - reverseIndex * 0.06,
              y: -reverseIndex * 15,
              zIndex: index,
              transformOrigin: '50% 100%',
            }}
            transition={{
              type: 'spring',
              stiffness: animationConfig.stiffness,
              damping: animationConfig.damping,
            }}
          >
            <CardRotate
              onSendToBack={sendToBack}
              sensitivity={sensitivity}
              setDragging={setIsDragging}
            >
              <div
                className="w-full h-full"
                onClick={() => isTop && sendToBackOnClick && sendToBack()}
              >
                {child}
              </div>
            </CardRotate>
          </motion.div>
        );
      })}
    </div>
  );
}