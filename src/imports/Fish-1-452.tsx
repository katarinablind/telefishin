import imgFish from "figma:asset/aa2523635365002931109eabfcb9c0b37dd2bef4.png";

export default function Fish() {
  return (
    <div className="relative size-full" data-name="fish">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFish} />
    </div>
  );
}