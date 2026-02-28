import imgImage15 from "figma:asset/9a3f96c963240e6a637e3db2316fbb44b751d3af.png";
import imgForefrontDeco from "figma:asset/83b5c6bf88bf70853000e0fb24f2fb28dc73c404.png";

export default function Background2() {
  return (
    <div className="bg-white relative size-full" data-name="background">
      <div className="absolute h-[836px] left-[-30px] top-0 w-[1254px]" data-name="image 15">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage15} />
      </div>
      <div className="absolute h-[895px] left-[-83px] top-[33px] w-[1343px]" data-name="forefront deco">
        <img alt="" className="absolute inset-0 max-w-none mix-blend-overlay object-50%-50% object-cover pointer-events-none size-full" src={imgForefrontDeco} />
      </div>
    </div>
  );
}
