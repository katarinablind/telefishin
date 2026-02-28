import imgFish from "figma:asset/e92309206d8ffd69c155ce53aedfd0360bcfe392.png";

export default function Fish() {
  return (
    <div className="relative size-full" data-name="fish">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFish} />
    </div>
  );
}