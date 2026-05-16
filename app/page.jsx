"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-cyan-500/20 bg-black/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-cyan-400 font-bold text-2xl">
          DAN
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-cyan-400">Home</a>
          <a href="#" className="hover:text-cyan-400">Paket</a>
          <a href="#" className="hover:text-cyan-400">Referral</a>

          <button className="border border-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition">
            Login
          </button>

          <button className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-cyan-300 transition">
            Register
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cyan-400"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-black border-t border-cyan-500/20">
          <a href="#" className="hover:text-cyan-400">Home</a>
          <a href="#" className="hover:text-cyan-400">Paket</a>
          <a href="#" className="hover:text-cyan-400">Referral</a>

          <button className="border border-cyan-400 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition">
            Login
          </button>

          <button className="bg-cyan-400 text-black py-2 rounded-xl font-semibold hover:bg-cyan-300 transition">
            Register
          </button>
        </div>
      )}
    </nav>
  );
}
