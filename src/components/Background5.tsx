import backgroundImage from 'figma:asset/99be7847edad1e3f8ac22817fb54208008f15b85.png';

export function Background5({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
    </div>
  );
}

export default function Background51() {
  return <Background5 className="relative size-full" />;
}
