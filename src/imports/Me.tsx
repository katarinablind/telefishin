function Me({ className }: { className?: string }) {
  return (
    <div className={className} data-name="me">
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none rotate-[180deg] scale-y-[-100%] size-[120px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative text-[120px] text-nowrap text-white whitespace-pre">🐠</p>
        </div>
      </div>
    </div>
  );
}

export default function Me1() {
  return <Me className="relative size-full" />;
}