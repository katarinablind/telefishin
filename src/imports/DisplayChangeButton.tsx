import imgDisplayChangeButton from "figma:asset/1306e008b0019fb0a9149ea23313718844e34c48.png";

interface DisplayChangeButtonProps {
  className?: string;
  onToggleDisplay?: () => void;
  backgroundIndex?: number;
}

export function DisplayChangeButton({ className, onToggleDisplay, backgroundIndex = 1 }: DisplayChangeButtonProps) {
  const getButtonStyle = () => {
    switch (backgroundIndex) {
      case 2: // Night display - darker
        return { filter: 'brightness(0.5) contrast(1.2)' };
      case 3: // Pixel display - pixelated
        return { imageRendering: 'pixelated' as const, filter: 'contrast(1.3)' };
      case 4: // Tele display - vintage TV effect
        return { filter: 'saturate(0.8) contrast(1.1) brightness(0.95)' };
      default: // Day display
        return {};
    }
  };

  return (
    <div 
      className={`${className} cursor-pointer`} 
      data-name="DisplayChangeButton"
      onClick={onToggleDisplay}
    >
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDisplayChangeButton} style={getButtonStyle()} />
    </div>
  );
}