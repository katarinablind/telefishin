"use client";

const BUTTON_SIZE = 48;
const BUTTON_GAP = 40;

interface TankButtonsProps {
  onPowerClick?: () => void;
  onBackgroundClick: () => void;
  onBubbleClick: () => void;
}

export function TankButtons({
  onPowerClick,
  onBackgroundClick,
  onBubbleClick,
}: TankButtonsProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ gap: BUTTON_GAP }}
    >
      <button
        type="button"
        onClick={onPowerClick}
        className="flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer transition-transform duration-150 ease-out hover:scale-110 active:scale-95"
        style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        aria-label="Power"
      >
        <img
          src="/buttons/power.png"
          alt=""
          className="w-full h-full object-contain pointer-events-none"
        />
      </button>
      <button
        type="button"
        onClick={onBackgroundClick}
        data-wallpaper-trigger
        className="flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer transition-transform duration-150 ease-out hover:scale-110 active:scale-95"
        style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        aria-label="Change wallpaper"
      >
        <img
          src="/buttons/background.png"
          alt=""
          className="w-full h-full object-contain pointer-events-none"
        />
      </button>
      <button
        type="button"
        onClick={onBubbleClick}
        className="flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer transition-transform duration-150 ease-out hover:scale-110 active:scale-95"
        style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
        aria-label="Send bubble"
      >
        <img
          src="/buttons/bubbles.png"
          alt=""
          className="w-full h-full object-contain pointer-events-none"
        />
      </button>
    </div>
  );
}
