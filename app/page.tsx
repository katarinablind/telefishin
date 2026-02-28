import { DemoTank } from "@/components/landing/DemoTank";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="font-pixelify text-3xl md:text-4xl text-center text-black mb-2" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
        Telefishin&apos;
      </h1>
      <p className="font-pixelify text-center text-neutral-700 mb-6 max-w-lg text-sm">
        A fish tank with all your long and short distance friends. Keep in touch without the stress of replying. And just keep swimming.
      </p>
      <DemoTank />
    </main>
  );
}
