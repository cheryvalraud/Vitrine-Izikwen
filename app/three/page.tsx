import ThreeScene from "@/components/ThreeScene";

export default function ThreePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      <ThreeScene />

      <div className="absolute left-6 top-6 z-10 max-w-md">
        <h1 className="text-3xl font-bold">Apparel Team</h1>
        
      </div>
    </main>
  );
}
