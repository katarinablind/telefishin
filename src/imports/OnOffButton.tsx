import imgOnOffButton from "figma:asset/a912d6615abed2cd94b8c422c9f757173744fd5f.png";

export function OnOffButton({ className, onDisplayChange, backgroundIndex = 1 }: { className?: string; onDisplayChange?: () => void; backgroundIndex?: number }) {
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
    <div className={className} data-name="OnOffButton" onClick={onDisplayChange} style={{ cursor: onDisplayChange ? 'pointer' : 'default' }}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgOnOffButton} style={getButtonStyle()} />
    </div>
  );
}

export default function OnOffButton1() {
  const handleDisplayChange = () => {
    // Empty handler - to be implemented later
  };

  return <OnOffButton className="relative size-full" onDisplayChange={handleDisplayChange} />;
}