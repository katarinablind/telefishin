import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Fish1 } from "./Fish1";
import { Fish2 } from "./Fish2";
import { Fish3 } from "./Fish3";
import { Fish4 } from "./Fish4";
import { Fish5 } from "./Fish5";
import { Fish6 } from "./Fish6";
import { Fish7 } from "./Fish7";
import { Fish8 } from "./Fish8";
import { Fish9 } from "./Fish9";
import { Fish10 } from "./Fish10";
import { Fish11 } from "./Fish11";
import sunImage from "figma:asset/2e83eebfb0194169db403e3654fd3fc63b713e09.png";
import moonImage from "figma:asset/fec3ab7383de166cf6914526dd3da03d6e1a4850.png";

interface AnimatedFishProps {
  id: string;
  fishType: number;
  initialY: number;
  duration: number;
  onComplete?: () => void;
}

export function AnimatedFish({ id, fishType, initialY, duration, onComplete }: AnimatedFishProps) {
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [animationKey, setAnimationKey] = useState(0);

  const fishSize = 120; // Updated to 120px
  const screenWidth = 1194; // Fixed screen width
  
  // Randomly assign day or night theme to this fish (persists for the fish's lifetime)
  const isDaytime = useMemo(() => Math.random() > 0.5, [id]);
  
  // Location mapping for each fish type
  const fishData = [
    { name: "Katarina", location: "Helsinki" },
    { name: "Anna", location: "New York City" }, 
    { name: "Keila", location: "Mexico City" },
    { name: "Sauhee", location: "Seoul" },
    { name: "Peggy", location: "Tokyo" },
    { name: "Friend6", location: "Miami" },
    { name: "Friend7", location: "Austin" },
    { name: "Friend8", location: "Denver" },
    { name: "Friend9", location: "Portland" },
    { name: "Friend10", location: "San Diego" },
    { name: "Friend11", location: "Nashville" }
  ];

  const renderFish = () => {
    const fishComponents = [
      Fish1, Fish2, Fish3, Fish4, Fish5, Fish6, Fish7, Fish8, Fish9, Fish10, Fish11
    ];
    const FishComponent = fishComponents[fishType - 1] || Fish1;
    return <FishComponent className="relative size-full" />;
  };

  // Use a timeout to handle direction change after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (direction === 'right') {
        setDirection('left');
        setAnimationKey(prev => prev + 1);
      } else {
        setDirection('right');
        setAnimationKey(prev => prev + 1);
      }
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [direction, animationKey, duration]);

  const startX = direction === 'right' ? -fishSize - 50 : screenWidth + 50;
  const endX = direction === 'right' ? screenWidth + 50 : -fishSize - 50;
  const scale = direction === 'right' ? 1 : 0.7;
  const scaleX = direction === 'right' ? -1 : 1; // Reversed: start flipped left, flip right when returning

  const currentFish = fishData[fishType - 1] || { name: `Friend${fishType}`, location: "Unknown" };

  return (
    <motion.div
      key={`${id}-${animationKey}`}
      className="absolute pointer-events-none"
      style={{
        width: fishSize,
        height: fishSize,
        top: initialY,
      }}
      initial={{
        x: startX,
        scale: scale,
        scaleX: scaleX,
        y: 0
      }}
      animate={{
        x: endX,
        y: [0, -20, 0]
      }}
      transition={{
        x: {
          duration: duration,
          ease: "linear",
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }
      }}
    >
      {/* Radial gradient glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: fishSize * 2.0,
          height: fishSize * 2.0,
          background: isDaytime 
            ? 'radial-gradient(circle at center, rgba(255, 200, 50, 0.8) 0%, rgba(255, 180, 70, 0.6) 25%, rgba(255, 165, 0, 0.5) 40%, rgba(255, 140, 0, 0.3) 60%, rgba(255, 120, 0, 0.1) 80%, transparent 100%)'
            : 'radial-gradient(circle at center, rgba(75, 0, 130, 1.0) 0%, rgba(60, 20, 140, 0.84) 25%, rgba(50, 50, 150, 0.7) 40%, rgba(40, 60, 140, 0.42) 60%, rgba(30, 30, 100, 0.14) 80%, transparent 100%)',
          filter: 'blur(8px)',
          zIndex: -1
        }}
      />
      
      {/* Emoji icon above fish */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ 
          top: '-35px',
          transform: `translateX(-50%) scaleX(${1 / scaleX})`,
        }}
      >
        {isDaytime ? (
          <img 
            src={sunImage} 
            alt="sun" 
            style={{ 
              width: '32px', 
              height: '32px',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
            }} 
          />
        ) : (
          <img 
            src={moonImage} 
            alt="moon" 
            style={{ 
              width: '32px', 
              height: '32px',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
            }} 
          />
        )}
      </div>
      
      {renderFish()}
      <div 
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-white pointer-events-none"
        style={{ 
          fontFamily: "'Pixelify Sans', sans-serif",
          fontWeight: 500,
          fontSize: `${scale * 16}px`,
          right: '-10px',
          transform: `translateY(-50%) translateX(100%) scaleX(${1 / scaleX})`
        }}
      >
        {currentFish.name} — {currentFish.location}
      </div>
    </motion.div>
  );
}