export default function DigitalAffiliateNetwork() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-black to-cyan-900 px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-4">
              Digital Affiliate Network
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Pakai Sendiri,
              <span className="text-cyan-400"> Bonus Mengalir</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Platform layanan digital modern untuk kebutuhan harian seperti
              paket data, pulsa, top up game, dan PPOB dengan sistem referral
              sederhana dan transparan.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-2xl shadow-lg shadow-cyan-500/30 transition-all">
                Daftar Sekarang
              </button>

              <button className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-6 py-3 rounded-2xl transition-all">
                Pelajari Sistem
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">
              Bonus Referral
            </h2>

            <div className="space-y-4">
              <div className="bg-black/40 rounded-2xl p-4 flex justify-between items-center">
                <span>Paket Data</span>
                <span className="text-cyan-400 font-bold">20%</span>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 flex justify-between items-center">
                <span>Pulsa & Top Up</span>
                <span className="text-cyan-400 font-bold">10%</span>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 flex justify-between items-center">
                <span>PPOB</span>
                <span className="text-cyan-400 font-bold">5%</span>
              </div>
            </div>

            <div className="mt-8 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5">
              <p className="text-sm text-gray-300">
                Member aktif cukup dengan membeli paket aktivasi dan menggunakan layanan seperti biasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Kenapa Pilih <span className="text-cyan-400">DAN</span>?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Sistem modern dengan fokus penggunaan pribadi dan bonus referral otomatis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Tanpa Deposit',
              desc: 'Langsung bayar menggunakan QRIS, e-wallet, atau transfer bank.',
            },
            {
              title: 'Referral 1 Level',
              desc: 'Sistem sederhana, transparan, dan mudah dipahami semua orang.',
            },
            {
              title: 'Bonus Otomatis',
              desc: 'Dapatkan reward otomatis setiap referral melakukan transaksi.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/40 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
                {item.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Activation Flow */}
      <section className="px-6 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Cara Kerja Sistem
            </h2>

            <p className="text-gray-400">
              Mudah digunakan untuk kebutuhan pribadi maupun referral.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              'Daftar Gratis',
              'Beli Paket Aktivasi',
              'Gunakan Layanan',
              'Dapatkan Reward',
            ].map((step, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>

                <h3 className="text-xl font-semibold">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 px-6 py-10 text-center text-gray-400">
        <p className="text-lg font-semibold text-white mb-2">
          Digital Affiliate Network
        </p>

        <p>
          Platform layanan digital modern dengan sistem referral sederhana.
        </p>
      </footer>
    </div>
  )
}
