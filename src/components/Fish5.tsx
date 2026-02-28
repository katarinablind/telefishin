import fishImage from "figma:asset/9aa616d977281cb90f7454dabdd336ff9af94f2c.png";

export function Fish5({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={fishImage} alt="Fish" className="w-[120px] h-[120px] object-contain scale-x-[-100%]" />
      </div>
    </div>
  );
}