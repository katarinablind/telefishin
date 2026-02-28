import fishImage from "figma:asset/ede4658239e911105b7b176c3d862de2a1458f58.png";

export function Fish6({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={fishImage} alt="Fish" className="w-[120px] h-[120px] object-contain" />
      </div>
    </div>
  );
}