import fishImage from "figma:asset/9914ebe650bf556ad948759f92f9be62915bd20a.png";

export function Fish3({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={fishImage} alt="Fish" className="w-[120px] h-[120px] object-contain" />
      </div>
    </div>
  );
}