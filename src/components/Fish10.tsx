export function Fish10({ className }: { className?: string }) {
  return (
    <div className={className} data-name="fish">
      <div className="absolute inset-0 flex items-center justify-center text-[120px] leading-none">
        🐬
      </div>
    </div>
  );
}