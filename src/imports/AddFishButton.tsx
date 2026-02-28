import imgAddFishButton from "figma:asset/55109a7cac121403dcd086793f017677e220dd8d.png";

export function AddFishButton({ className, onAddFish, backgroundIndex = 1 }: { className?: string; onAddFish?: () => void; backgroundIndex?: number }) {
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
    <div className={className} data-name="AddFishButton" onClick={onAddFish} style={{ cursor: onAddFish ? 'pointer' : 'default' }}>
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAddFishButton} style={getButtonStyle()} />
    </div>
  );
}

export default function AddFishButton1() {
  const handleAddFish = () => {
    // Empty handler - to be implemented later
  };

  return <AddFishButton className="relative size-full" onAddFish={handleAddFish} />;
}