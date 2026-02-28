import { useState, useRef } from "react";
import { motion } from "motion/react";
import Background1 from "./components/Background1";
import Background2 from "./components/Background2";
import Background3 from "./components/Background3";
import Background4 from "./components/Background4";
import Background5 from "./components/Background5";
import { Me } from "./components/Me";
import { OnOffButton } from "./imports/OnOffButton";
import { AddFishButton } from "./imports/AddFishButton";
import { BubbleButton } from "./imports/BubbleButton";
import { DisplayChangeButton } from "./imports/DisplayChangeButton";
import { Bubble } from "./imports/Bubble";
import { AnimatedFish } from "./components/AnimatedFish";
import { Onboarding } from "./components/Onboarding";
import bubbleImage from "figma:asset/4f4b39e0a16034ae7e8f982509521c35c8a0c328.png";

interface FishInstance {
  id: string;
  fishType: number;
  y: number;
  duration: number;
}

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(1);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);
  const [fishIndex, setFishIndex] = useState(1);
  const [fishes, setFishes] = useState<FishInstance[]>([]);
  const [nextFishId, setNextFishId] = useState(0);
  const lastFishYRef = useRef<number | null>(null);
  const [isDisplayOn, setIsDisplayOn] = useState(true);

  const handleDisplayChange = () => {
    setBackgroundIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex > 5 ? 1 : nextIndex;
    });
  };

  const handleToggleDisplay = () => {
    setIsDisplayOn(prev => !prev);
  };

  const handleAddFish = () => {
    // Random Y position (keep fish in the viewable area, avoiding the bottom UI)
    const minY = 50;
    const maxY = 834 - 300; // Fixed height minus bottom area
    const minSpacing = 120; // Minimum vertical spacing between consecutive fish
    
    let randomY: number;
    let attempts = 0;
    const maxAttempts = 20;
    
    // Generate a random Y position that doesn't overlap with the last fish
    do {
      randomY = Math.random() * (maxY - minY) + minY;
      attempts++;
      
      // If we've tried many times or there's no last fish, just use the current position
      if (attempts >= maxAttempts || lastFishYRef.current === null) {
        break;
      }
    } while (Math.abs(randomY - lastFishYRef.current) < minSpacing);
    
    // Store the Y position for next spawn
    lastFishYRef.current = randomY;

    // Create new fish
    const newFish: FishInstance = {
      id: `fish-${nextFishId}`,
      fishType: fishIndex,
      y: randomY,
      duration: Math.random() * 8 + 18 // Random duration between 18 and 26 seconds
    };

    setFishes(prev => [...prev, newFish]);
    setNextFishId(prev => prev + 1);

    // Increment fishIndex and wrap around after 11
    setFishIndex(prev => (prev >= 11 ? 1 : prev + 1));
  };

  const handleBubbleClick = () => {
    // Toggle the bubble on/off
    setIsBubbleVisible(prev => !prev);
  };

  const handleResetScreen = () => {
    // Reset to onboarding screen
    setOnboardingComplete(false);
    setFishes([]);
    setFishIndex(1);
    setNextFishId(0);
    setBackgroundIndex(1);
    setIsBubbleVisible(false);
    setIsDisplayOn(true);
    lastFishYRef.current = null;
  };

  const renderBackground = () => {
    const backgrounds = [
      { id: 1, Component: Background1 },
      { id: 2, Component: Background2 },
      { id: 3, Component: Background3 },
      { id: 4, Component: Background4 },
      { id: 5, Component: Background5 }
    ];

    return (
      <>
        {backgrounds.map(({ id, Component }) => (
          <motion.div
            key={id}
            initial={false}
            animate={{
              opacity: backgroundIndex === id ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{ pointerEvents: backgroundIndex === id ? 'auto' : 'none' }}
          >
            <Component />
          </motion.div>
        ))}
      </>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-[1194px] h-[834px] overflow-hidden">
        {/* Background layer - always visible */}
        {renderBackground()}
        
        {/* Onboarding screen */}
        {!onboardingComplete && (
          <Onboarding onComplete={() => setOnboardingComplete(true)} />
        )}

        {/* Main app content - only show after onboarding */}
        {onboardingComplete && (
          <>
            {/* Fish layer */}
            <div className="absolute inset-0 pointer-events-none z-5">
              {fishes.map((fish) => (
                <AnimatedFish
                  key={fish.id}
                  id={fish.id}
                  fishType={fish.fishType}
                  initialY={fish.y}
                  duration={fish.duration}
                />
              ))}
            </div>

            {/* Bubble container - positioned above the Me component */}
            <div className="absolute left-1/2 bottom-[240px] -translate-x-1/2 w-[100px] h-[100px] pointer-events-none z-10">
              {isBubbleVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative size-full"
                >
                  <Bubble className="relative size-full" />
                </motion.div>
              )}
            </div>

            {/* Me component - fixed position, always visible */}
            <div className="absolute left-1/2 bottom-[120px] -translate-x-1/2 w-[120px] h-[120px] z-20">
              <Me className="relative size-full" />
            </div>

            {/* Black overlay when display is off */}
            {!isDisplayOn && (
              <div className="absolute inset-0 bg-black z-40" />
            )}

            {/* Control buttons at the bottom */}
            <div className="absolute bottom-8 left-0 right-0 z-50">
              <div className={`absolute bottom-0 left-[120px] w-[80px] h-[80px] ${!isDisplayOn ? 'hidden' : ''}`}>
                <AddFishButton className="relative size-full" onAddFish={handleAddFish} backgroundIndex={backgroundIndex} />
              </div>
              <div className={`absolute bottom-0 left-[320px] w-[80px] h-[80px] ${!isDisplayOn ? 'hidden' : ''}`}>
                <OnOffButton className="relative size-full" onDisplayChange={handleDisplayChange} backgroundIndex={backgroundIndex} />
              </div>
              <div className={`absolute bottom-0 right-[320px] w-[80px] h-[80px] ${!isDisplayOn ? 'hidden' : ''}`}>
                <BubbleButton className="relative size-full" onBubbleClick={handleBubbleClick} backgroundIndex={backgroundIndex} />
              </div>
              <div className={`absolute bottom-0 right-[120px] w-[80px] h-[80px] transition-opacity duration-300 ${!isDisplayOn ? 'opacity-20' : 'opacity-100'}`}>
                <DisplayChangeButton className="relative size-full" onToggleDisplay={handleToggleDisplay} backgroundIndex={backgroundIndex} />
              </div>
            </div>

            {/* Reset bubble in top right corner */}
            <img
              src={bubbleImage}
              alt="Reset"
              className="absolute top-[70px] right-[70px] w-[60px] h-[60px] opacity-10 cursor-pointer object-contain z-50 hover:opacity-20 transition-opacity"
              onClick={handleResetScreen}
            />
          </>
        )}
      </div>
    </div>
  );
}