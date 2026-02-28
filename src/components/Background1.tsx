import imgDay1 from "figma:asset/179a491d95e6c511b0facb4a9bba5960f115a463.png";

export default function Background1() {
  return (
    <div className="bg-white relative size-full" data-name="background">
      <div className="absolute h-[834px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1194px]" data-name="day 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDay1} />
      </div>
    </div>
  );
}
