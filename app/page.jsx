export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-cyan-400">
        DIGITAL AFFILIATE NETWORK
      </h1>

      <p className="mt-6 text-xl">
        Landing page berhasil tampil
      </p>

      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-cyan-500">
          Paket Data
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-cyan-500">
          Pulsa
        </div>
      </div>
    </main>
  );
}
