import imgFish from "figma:asset/dcc93aa4513a4aa063f80e3995f245a4326a4c2e.png";

export default function Fish() {
  return (
    <div className="relative size-full" data-name="fish">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFish} />
    </div>
  );
}