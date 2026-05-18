"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function ProdukPage() {

  const [member, setMember] = useState(null);

  useEffect(() => {

    const localMember = JSON.parse(
      localStorage.getItem("member")
    );

    if (localMember) {
      setMember(localMember);
    }

  }, []);

  const handleAktivasi = async () => {

    if (!member) {
      alert("Member tidak ditemukan");
      return;
    }

    // AKTIFKAN MEMBER
    const { error } = await supabase
      .from("members")
      .update({
        status: "active",
      })
      .eq("id", member.id);

    if (error) {

      alert("Aktivasi gagal");
      console.log(error);

    } else {

      // BONUS SPONSOR
      if (member.sponsor_code) {

        const { data: sponsor } = await supabase
          .from("members")
          .select("*")
          .eq(
            "referral_code",
            member.sponsor_code
          )
          .single();

        if (sponsor) {

          await supabase
            .from("members")
            .update({
              saldo:
                Number(sponsor.saldo || 0) + 1000,
            })
            .eq("id", sponsor.id);

        }
      }

      alert("Member berhasil diaktivasi");

      window.location.href = "/";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">
        Aktivasi Member
      </h1>

      <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

        <h2 className="text-3xl font-bold">
          Paket Aktivasi DAN
        </h2>

        <p className="text-zinc-400 mt-3 leading-relaxed">
          Aktivasi akun member untuk membuka
          semua fitur referral dan bonus transaksi.
        </p>

        <h3 className="text-5xl font-bold text-green-400 mt-8">
          Rp 50.000
        </h3>

        <button
          onClick={handleAktivasi}
          className="w-full mt-8 bg-cyan-400 text-black py-4 rounded-2xl font-bold"
        >
          Aktivasi Sekarang
        </button>

      </div>

    </main>
  );
}
