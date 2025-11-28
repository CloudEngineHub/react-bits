import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

function CardRotate({ children, onSendToBack, sensitivity, setDragging }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
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
      style={{ x, y, rotateX, rotateY, zIndex: 1, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'grab' }}
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

export default function Stack({
  children,
  randomRotation = false,
  sensitivity = 200,
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  animationConfig = { stiffness: 260, damping: 20 },
  className = '',
}) {
  const childrenArray = React.Children.toArray(children);

  const [order, setOrder] = useState([]);
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
      className={className}
      style={{ position: 'relative', height: '100%', width: '100%', perspective: 600 }}
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
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                style={{ width: '100%', height: '100%' }}
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