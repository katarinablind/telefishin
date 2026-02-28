import imgFish from "figma:asset/0849fd07e7a89b0c135e30ad68cf1e1fcdc80cc9.png";

export function Fish9({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center text-[120px] leading-none">
        🦀
      </div>
    </div>
  );
}