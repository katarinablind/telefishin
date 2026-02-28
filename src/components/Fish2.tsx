import fishImage from "figma:asset/cbe27a4cafa56d123990a405434e12d8bfa684e9.png";

export function Fish2({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={fishImage} alt="Fish" className="w-[120px] h-[120px] object-contain" />
      </div>
    </div>
  );
}