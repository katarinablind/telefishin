import fishImage from "figma:asset/8f19a7ec51741eec3ee9bdd4a3f86dae6977d744.png";

export function Fish4({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={fishImage} alt="Fish" className="w-[120px] h-[120px] object-contain scale-x-[-100%]" />
      </div>
    </div>
  );
}