export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-cyan-500/20">
        <h1 className="text-3xl font-bold text-cyan-400">
          DAN
        </h1>

        <button className="bg-cyan-400 text-black px-5 py-2 rounded-xl font-semibold">
          Register
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16">

        <p className="text-cyan-400 tracking-[4px] text-sm mb-4">
          DIGITAL AFFILIATE NETWORK
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          Bangun Jaringan, <br />
          <span className="text-cyan-400">
            Raih Penghasilan
          </span>
        </h1>

        <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
          Platform bisnis digital modern untuk paket data,
          pulsa, PPOB, dan top up game dengan sistem
          referral sederhana.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold">
            Daftar Sekarang
          </button>

          <button className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-2xl font-bold">
            Pelajari Sistem
          </button>
        </div>

      </section>

    </main>
  );
}
