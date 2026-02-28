import imgBettaFish1 from "figma:asset/3f8264172a3910f44f2c2403b6de23b6aa796464.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute flex items-center justify-center left-0 size-[500px] top-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="relative size-[500px]" data-name="betta fish 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBettaFish1} />
          </div>
        </div>
      </div>
      <div className="absolute bg-white left-[407px] size-[13px] top-[236px]" />
    </div>
  );
}