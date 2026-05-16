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

      {/* Hero */}
      <section className="px-6 py-20">

        <p className="text-cyan-400 tracking-[4px] text-sm mb-4">
          DIGITAL AFFILIATE NETWORK
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          Bangun Jaringan, <br />
          <span className="text-cyan-400">
            Raih Penghasilan
          </span>
        </h1>

        <p className="text-zinc-400 mt-6 text-lg leading-relaxed max-w-xl">
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
{/* Produk */}
<section className="px-6 pb-20">

  <h2 className="text-4xl font-bold mb-10">
    Produk <span className="text-cyan-400">Digital</span>
  </h2>

  <div className="grid gap-5">

    <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-cyan-400">
        Paket Data
      </h3>

      <p className="text-zinc-400 mt-2">
        Bonus referral hingga 20%
      </p>
    </div>

    <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-cyan-400">
        Pulsa & Top Up Game
      </h3>

      <p className="text-zinc-400 mt-2">
        Bonus referral hingga 10%
      </p>
    </div>

    <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">
      <h3 className="text-2xl font-bold text-cyan-400">
        PPOB
      </h3>

      <p className="text-zinc-400 mt-2">
        Bonus referral hingga 5%
      </p>
    </div>

  </div>

</section>

      {/* Cara Kerja */}
<section className="px-6 pb-20">

  <h2 className="text-4xl font-bold mb-10">
    Cara <span className="text-cyan-400">Kerja</span>
  </h2>

  <div className="grid gap-5">

    <div className="bg-zinc-900 rounded-3xl p-6 border border-cyan-500/20">
      <div className="text-cyan-400 text-3xl font-bold mb-4">
        01
      </div>

      <h3 className="text-2xl font-bold mb-2">
        Daftar Member
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        Member mendaftar menggunakan kode referral sponsor.
      </p>
    </div>

    <div className="bg-zinc-900 rounded-3xl p-6 border border-cyan-500/20">
      <div className="text-cyan-400 text-3xl font-bold mb-4">
        02
      </div>

      <h3 className="text-2xl font-bold mb-2">
        Belanja Produk
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        Member melakukan pembelian produk digital dan upload bukti pembayaran.
      </p>
    </div>

    <div className="bg-zinc-900 rounded-3xl p-6 border border-cyan-500/20">
      <div className="text-cyan-400 text-3xl font-bold mb-4">
        03
      </div>

      <h3 className="text-2xl font-bold mb-2">
        Bonus Referral Cair
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        Sponsor mendapatkan bonus otomatis dari transaksi referral.
      </p>
    </div>

  </div>

</section>

      {/* Bonus Referral */}
<section className="px-6 pb-20">

  <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-3xl p-8">

    <p className="text-cyan-400 tracking-[4px] text-sm mb-4">
      BONUS REFERRAL
    </p>

    <h2 className="text-4xl font-bold leading-tight">
      Semakin Aktif Jaringan,
      <br />
      Semakin Besar Bonus
    </h2>

    <div className="mt-10 space-y-5">

      <div>
        <div className="flex justify-between mb-2">
          <span>Paket Data</span>
          <span className="text-cyan-400 font-bold">
            20%
          </span>
        </div>

        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-[20%] bg-cyan-400 rounded-full"></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>Pulsa & Top Up</span>
          <span className="text-cyan-400 font-bold">
            10%
          </span>
        </div>

        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-[10%] bg-cyan-400 rounded-full"></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>PPOB</span>
          <span className="text-cyan-400 font-bold">
            5%
          </span>
        </div>

        <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full w-[5%] bg-cyan-400 rounded-full"></div>
        </div>
      </div>

    </div>

  </div>

</section>

      {/* CTA */}
<section className="px-6 pb-20">

  <div className="bg-cyan-400 text-black rounded-3xl p-8 text-center">

    <p className="font-semibold tracking-[3px] mb-4">
      MULAI SEKARANG
    </p>

    <h2 className="text-4xl font-bold leading-tight">
      Bangun Jaringan Digital
      <br />
      Bersama DAN
    </h2>

    <p className="mt-6 text-lg">
      Daftar gratis dan mulai hasilkan bonus referral dari transaksi member.
    </p>

    <button className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-bold">
      Register Member
    </button>

  </div>

</section>

{/* Footer */}
<footer className="px-6 pb-10 text-center text-zinc-500 border-t border-cyan-500/10 pt-8">

  <h3 className="text-cyan-400 text-2xl font-bold mb-3">
    DAN
  </h3>

  <p>
    Digital Affiliate Network
  </p>

  <p className="mt-2 text-sm">
    Bangun Jaringan, Raih Penghasilan
  </p>

</footer>
      
    </main>
  );
}
