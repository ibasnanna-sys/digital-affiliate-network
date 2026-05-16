"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Smartphone,
  Wifi,
  Zap,
  Gamepad2,
  Users,
  Wallet,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function DANLandingPage() {
  const [open, setOpen] = useState(false);

  const products = [
    {
      title: "Paket Data",
      icon: <Wifi className="w-8 h-8" />,
      bonus: "Bonus Referral 20%",
    },
    {
      title: "Pulsa",
      icon: <Smartphone className="w-8 h-8" />,
      bonus: "Bonus Referral 10%",
    },
    {
      title: "Topup Game",
      icon: <Gamepad2 className="w-8 h-8" />,
      bonus: "Bonus Referral 10%",
    },
    {
      title: "PPOB",
      icon: <Zap className="w-8 h-8" />,
      bonus: "Bonus Referral 5%",
    },
  ];

  const steps = [
    "Daftar menggunakan referral",
    "Order produk digital",
    "Upload bukti pembayaran",
    "Bonus referral cair otomatis",
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-cyan-500/20 bg-black/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">DAN</h1>
            <p className="text-xs text-zinc-400">
              Digital Affiliate Network
            </p>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#home" className="hover:text-cyan-400 transition">
              Home
            </a>
            <a href="#produk" className="hover:text-cyan-400 transition">
              Produk
            </a>
            <a href="#cara-kerja" className="hover:text-cyan-400 transition">
              Cara Kerja
            </a>
            <a href="#referral" className="hover:text-cyan-400 transition">
              Referral
            </a>

            <button className="border border-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition">
              Login
            </button>

            <button className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-cyan-300 transition">
              Register
            </button>
          </div>

          <button
            className="md:hidden text-cyan-400"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-cyan-500/20 bg-black px-4 py-4 flex flex-col gap-4">
            <a href="#home">Home</a>
            <a href="#produk">Produk</a>
            <a href="#cara-kerja">Cara Kerja</a>
            <a href="#referral">Referral</a>

            <button className="border border-cyan-400 py-2 rounded-xl">
              Login
            </button>

            <button className="bg-cyan-400 text-black py-2 rounded-xl font-semibold">
              Register
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full text-sm mb-6">
            <ShieldCheck className="w-4 h-4" />
            Platform Referral Produk Digital
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Pakai Sendiri,
            <span className="text-cyan-400 block">
              Bonus Mengalir
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl mt-6 leading-8 max-w-xl">
            Bangun jaringan member aktif melalui transaksi produk digital
            dan sistem referral berbasis profit nyata.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button className="bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-300 transition flex items-center justify-center gap-2">
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>

            <button className="border border-cyan-500 px-8 py-4 rounded-2xl hover:bg-cyan-500 hover:text-black transition">
              Pelajari Sistem
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />

          <div className="relative bg-zinc-900 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-zinc-400 text-sm">Bonus Referral</p>
                <h2 className="text-4xl font-bold text-cyan-400">
                  Rp1.250.000
                </h2>
              </div>

              <Wallet className="w-12 h-12 text-cyan-400" />
            </div>

            <div className="space-y-4">
              <div className="bg-black rounded-2xl p-4 border border-zinc-800">
                <div className="flex justify-between text-sm mb-2">
                  <span>Paket Data</span>
                  <span className="text-cyan-400">20%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-cyan-400" />
                </div>
              </div>

              <div className="bg-black rounded-2xl p-4 border border-zinc-800">
                <div className="flex justify-between text-sm mb-2">
                  <span>Pulsa & Topup</span>
                  <span className="text-cyan-400">10%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-2/4 h-full bg-cyan-400" />
                </div>
              </div>

              <div className="bg-black rounded-2xl p-4 border border-zinc-800">
                <div className="flex justify-between text-sm mb-2">
                  <span>PPOB</span>
                  <span className="text-cyan-400">5%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["5.000+", "Member Aktif"],
          ["100+", "Produk Digital"],
          ["24 Jam", "Layanan Admin"],
          ["Real Time", "Bonus Referral"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6 text-center hover:shadow-cyan-500/20 hover:shadow-2xl transition"
          >
            <h3 className="text-3xl font-bold text-cyan-400">{value}</h3>
            <p className="text-zinc-400 mt-2 text-sm">{label}</p>
          </div>
        ))}
      </section>

      {/* Products */}
      <section id="produk" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-14">
          <p className="text-cyan-400 font-semibold mb-4">PRODUK DIGITAL</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Produk Lengkap,
            <span className="text-cyan-400"> Bonus Mengalir</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.title}
              className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-8 hover:shadow-cyan-500/20 hover:shadow-2xl transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

              <p className="text-zinc-400 leading-7">
                Transaksi produk digital dengan sistem referral aktif.
              </p>

              <div className="mt-6 inline-flex border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full text-sm">
                {item.bonus}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section
        id="cara-kerja"
        className="bg-zinc-950 border-y border-cyan-500/10 py-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-semibold mb-4">CARA KERJA</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Sistem Mudah &
              <span className="text-cyan-400"> Transparan</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step}
                className="bg-black border border-cyan-500/20 rounded-3xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-2xl mx-auto mb-6">
                  {index + 1}
                </div>

                <p className="text-lg leading-8">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral */}
      <section id="referral" className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-cyan-400 font-semibold mb-4">
              SISTEM REFERRAL
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Bangun Jaringan,
              <span className="text-cyan-400 block">
                Raih Penghasilan
              </span>
            </h2>

            <p className="text-zinc-400 text-lg leading-8 mt-6">
              Dapatkan bonus sponsor dan bonus transaksi dari referral
              langsung melalui transaksi produk digital nyata.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Bonus sponsor Rp1.000",
                "Unlimited direct referral",
                "Bonus berdasarkan profit transaksi",
                "Tanpa deposit saldo",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 bg-zinc-900 border border-cyan-500/20 rounded-2xl px-5 py-4"
                >
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">
              Simulasi Referral
            </h3>

            <div className="space-y-6">
              <div className="bg-black rounded-2xl p-5 border border-zinc-800">
                <p className="text-zinc-400 mb-2">Mengajak 10 member aktif</p>
                <h4 className="text-2xl font-bold">10 × Rp1.000</h4>
              </div>

              <div className="bg-black rounded-2xl p-5 border border-zinc-800">
                <p className="text-zinc-400 mb-2">
                  Bonus transaksi referral
                </p>
                <h4 className="text-2xl font-bold text-cyan-400">
                  Mengalir setiap transaksi
                </h4>
              </div>

              <div className="bg-cyan-500 text-black rounded-2xl p-6">
                <p className="font-semibold mb-2">Potensi Bonus</p>
                <h2 className="text-4xl font-bold">Unlimited</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Area */}
      <section className="bg-zinc-950 border-y border-cyan-500/10 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-semibold mb-4">MEMBER AREA</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Masuk & Mulai
              <span className="text-cyan-400"> Bangun Jaringan</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Login */}
            <div className="bg-black border border-cyan-500/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-8">Login Member</h3>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Nomor WhatsApp"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

                <button className="w-full bg-cyan-400 text-black py-4 rounded-2xl font-semibold hover:bg-cyan-300 transition">
                  Login Sekarang
                </button>
              </div>
            </div>

            {/* Register */}
            <div className="bg-black border border-cyan-500/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-8">Register Member</h3>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="text"
                  placeholder="Nomor WhatsApp"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

                <input
                  type="text"
                  placeholder="Kode Referral"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                />

                <button className="w-full bg-cyan-400 text-black py-4 rounded-2xl font-semibold hover:bg-cyan-300 transition">
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-14">
        <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-10 md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              DIGITAL AFFILIATE NETWORK
            </h2>
            <p className="text-zinc-400 mt-4 text-lg">
              Bangun Jaringan, Raih Penghasilan
            </p>
          </div>

          <div className="flex flex-col gap-3 text-zinc-400">
            <p>Produk Digital</p>
            <p>Referral Aktif</p>
            <p>Transaksi Nyata</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
