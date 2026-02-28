import imgFish from "figma:asset/5cd4cbe90de5423bfd62550b26b43705706c71f5.png";

export default function Fish() {
  return (
    <div className="relative size-full" data-name="fish">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFish} />
    </div>
  );
}