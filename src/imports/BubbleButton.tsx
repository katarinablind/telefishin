import imgBubbleButton from "figma:asset/6cd643feb093b638c7da89882a92cfa98890b661.png";

export function BubbleButton({ className, onBubbleClick, backgroundIndex = 1 }: { className?: string; onBubbleClick?: () => void; backgroundIndex?: number }) {
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
    <div className={className} data-name="BubbleButton" onClick={onBubbleClick} style={{ cursor: onBubbleClick ? 'pointer' : 'default' }}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBubbleButton} style={getButtonStyle()} />
    </div>
  );
}

export default function BubbleButton1() {
  const handleBubbleClick = () => {
    // Empty handler - to be implemented later
  };

  return <BubbleButton className="relative size-full" onBubbleClick={handleBubbleClick} />;
}