import qrImage from "figma:asset/91fa2098ce49715cda401b679ca8ab80fbce4bff.png";
import logoImage from "figma:asset/fb383938864c513c07eb46e460c17080e2cc8f19.png";

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div 
        className="flex flex-col items-center max-w-[550px] px-10 py-12 rounded-3xl shadow-2xl"
        style={{
          background: 'rgba(39, 74, 158, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Logo */}
        <img
          src={logoImage}
          alt="Telefishin' Logo"
          className="mb-3 object-contain"
          style={{
            width: '120px',
            height: 'auto'
          }}
        />

        {/* Title */}
        <h1 
          className="text-[56px] text-white mb-6 text-center"
          style={{
            fontFamily: "'Pixelify Sans', monospace",
            fontWeight: 500,
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
            letterSpacing: '2px'
          }}
        >
          TELEFISHIN
        </h1>

        {/* Description */}
        <p 
          className="text-white text-center mb-10 leading-relaxed"
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '18px',
            lineHeight: '1.6'
          }}
        >
          A gentle way to feel the presence of your long-distance friends without overwhelming your senses.
          <br /><br />
          To set up your tank, please scan the QR code below.
        </p>

        {/* QR Code Bubble */}
        <div 
          className="relative mb-10 rounded-full p-6 shadow-2xl"
          style={{
            width: '220px',
            height: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid rgba(255,255,255,0.5)',
            backgroundColor: '#ffffff'
          }}
        >
          {/* QR Code Image */}
          <img
            src={qrImage}
            alt="QR Code"
            className="object-contain"
            style={{
              width: '150px',
              height: '150px'
            }}
          />
        </div>

        {/* CTA Button */}
        <button
          onClick={onComplete}
          className="px-12 py-4 bg-[#4a9eff] hover:bg-[#3d8eef] active:bg-[#2d7edf] text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: '22px',
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none'
          }}
        >
          Start Swimming
        </button>
      </div>
    </div>
  );
}