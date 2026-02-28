import fishImage from "figma:asset/bb06dd504635a697cb4f0d657256f8beeda19a79.png";

export function Fish1({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={fishImage} alt="Fish" className="w-[120px] h-[120px] object-contain scale-x-[-100%]" />
      </div>
    </div>
  );
}