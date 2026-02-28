import imgFish from "figma:asset/dcc93aa4513a4aa063f80e3995f245a4326a4c2e.png";

export function Fish8({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center text-[120px] leading-none">
        🪼
      </div>
    </div>
  );
}