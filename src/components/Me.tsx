import { motion } from "motion/react";
import fishImage from "figma:asset/4fb477243f28054f11aa2c361a5ba038005e64aa.png";

export function Me({ className }: { className?: string }) {
  return (
    <div className={className} data-name="me">
      <motion.div 
        className="absolute flex inset-0 items-center justify-center"
        animate={{
          y: [0, -15, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex-none rotate-[180deg] scale-x-[-100%] scale-y-[-100%] size-[120px]">
          <img src={fishImage} alt="Fish" className="w-full h-full object-contain" />
        </div>
      </motion.div>
      <div 
        className="absolute whitespace-nowrap text-white pointer-events-none"
        style={{ 
          fontFamily: "'Pixelify Sans', sans-serif",
          fontWeight: 500,
          fontSize: '16px',
          left: '50%',
          bottom: '-30px',
          transform: 'translateX(-50%)'
        }}
      >
        Me — Seattle
      </div>
    </div>
  );
}

export default function Me1() {
  return <Me className="relative size-full" />;
}