"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [whatsapp, setWhatsapp] =
    useState("");

  const [alamat, setAlamat] =
    useState("");

  const [kota, setKota] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // REGISTER MEMBER
  // =========================
  const handleRegister =
    async (e) => {

      e.preventDefault();

      if (
        !name ||
        !whatsapp ||
        !alamat ||
        !kota ||
        !password
      ) {

        alert("Lengkapi data");

        return;

      }

      setLoading(true);

      // =========================
      // CEK WHATSAPP
      // =========================
      const { data: checkMember } =
        await supabase
          .from("members")
          .select("*")
          .eq("whatsapp", whatsapp)
          .single();

      if (checkMember) {

        alert(
          "Nomor WhatsApp sudah terdaftar"
        );

        setLoading(false);

        return;

      }

      // =========================
      // GENERATE MEMBER ID
      // =========================
      const randomId =
        Math.floor(
          1000 + Math.random() * 9000
        );

      const memberCode =
        `DAN${randomId}`;

      // =========================
      // INSERT MEMBER
      // =========================
      const { data, error } =
        await supabase
          .from("members")
          .insert([
            {
              name,
              whatsapp,
              alamat,
              kota,
              password,
              member_code:
                memberCode,
              status:
                "pending",
            },
          ])
          .select()
          .single();

      if (error) {

        console.log(error);

        alert("Registrasi gagal");

        setLoading(false);

        return;

      }

      // =========================
      // SAVE LOGIN
      // =========================
      localStorage.setItem(
        "member",
        JSON.stringify(data)
      );

      alert(
        "Registrasi berhasil"
      );

      router.push("/dashboard");

    };

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
      p-4
      md:p-6
      flex
      items-center
      justify-center
    ">

      <div className="
        w-full
        max-w-2xl
        bg-zinc-900
        border border-cyan-500/20
        rounded-3xl
        p-6 md:p-8
      ">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="
            text-3xl
            md:text-5xl
            font-bold
            text-cyan-400
          ">

            Registrasi Member

          </h1>

          <p className="
            text-zinc-400
            mt-3
          ">

            Daftar menjadi member DAN

          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          {/* NAMA */}
          <div>

            <label className="
              text-sm
              text-zinc-400
              block
              mb-2
            ">

              Nama Lengkap

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Masukkan nama lengkap"
              className="
                w-full
                bg-black
                border border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* WHATSAPP */}
          <div>

            <label className="
              text-sm
              text-zinc-400
              block
              mb-2
            ">

              Nomor WhatsApp

            </label>

            <input
              type="number"
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(
                  e.target.value
                )
              }
              placeholder="08xxxxxxxxxx"
              className="
                w-full
                bg-black
                border border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* ALAMAT */}
          <div>

            <label className="
              text-sm
              text-zinc-400
              block
              mb-2
            ">

              Alamat

            </label>

            <textarea
              value={alamat}
              onChange={(e) =>
                setAlamat(
                  e.target.value
                )
              }
              placeholder="Masukkan alamat lengkap"
              className="
                w-full
                bg-black
                border border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
                min-h-[120px]
              "
            />

          </div>

          {/* KOTA */}
          <div>

            <label className="
              text-sm
              text-zinc-400
              block
              mb-2
            ">

              Kota

            </label>

            <input
              type="text"
              value={kota}
              onChange={(e) =>
                setKota(
                  e.target.value
                )
              }
              placeholder="Masukkan kota"
              className="
                w-full
                bg-black
                border border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="
              text-sm
              text-zinc-400
              block
              mb-2
            ">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Masukkan password"
              className="
                w-full
                bg-black
                border border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-cyan-400
              text-black
              py-4
              rounded-2xl
              font-bold
              transition-all
              hover:bg-cyan-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {loading
              ? "Memproses..."
              : "Daftar Sekarang"}

          </button>

        </form>

      </div>

    </main>
