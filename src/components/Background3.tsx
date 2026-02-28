import imgImage104 from "figma:asset/1d1afda3b375baef76c758e45ced10446a3c1691.png";
import imgImage108 from "figma:asset/79571c48c8c21269d643e8bc0a042148a5f568e7.png";

export default function Background3() {
  return (
    <div className="bg-white relative size-full" data-name="background">
      <div className="absolute h-[834px] left-1/2 top-0 translate-x-[-50%] w-[1252px]" data-name="image 104">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage104} />
      </div>
      <div className="absolute h-[876px] left-0 top-[-24px] w-[1194px]" data-name="image 108">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage108} />
      </div>
    </div>
  );
}
