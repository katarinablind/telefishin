import { motion } from "framer-motion";
import { useMemo } from "react";
import bubbleImage from "figma:asset/4f4b39e0a16034ae7e8f982509521c35c8a0c328.png";

export function Bubble({ className }: { className?: string }) {
  // Generate 10 bubbles with random positions and sizes
  // Use useMemo to ensure the bubble configuration stays stable across re-renders
  const bubbles = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 30, // Random size between 30-60px
      x: Math.random() * 100, // Random x position within 100px width
      y: Math.random() * 100, // Random y position within 100px height
      delay: Math.random() * 2, // Random animation delay
      duration: Math.random() * 3 + 2, // Random duration between 2-5 seconds
      xMovement: Math.random() * 4 - 2, // Random x movement, stored once
    })),
    [] // Empty dependency array means this only runs once
  );

  return (
    <div className={className} data-name="Bubble">
      {bubbles.map((bubble) => (
        <motion.img
          key={bubble.id}
          alt=""
          className="absolute pointer-events-none object-contain"
          src={bubbleImage}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
          }}
          animate={{
            y: [0, -10, 0],
            x: [0, bubble.xMovement, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Bubble1() {
  return <Bubble className="relative size-full" />;
}