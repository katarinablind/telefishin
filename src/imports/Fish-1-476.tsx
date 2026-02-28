import imgFish from "figma:asset/0849fd07e7a89b0c135e30ad68cf1e1fcdc80cc9.png";

export default function Fish() {
  return (
    <div className="relative size-full" data-name="fish">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFish} />
    </div>
  );
}