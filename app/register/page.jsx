"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [password, setPassword] = useState("");

  const [sponsorCode, setSponsorCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // GET REFERRAL CODE
  // =========================
  useEffect(() => {

    const ref =
      searchParams.get("ref");

    if (ref) {

      setSponsorCode(ref);

    }

  }, [searchParams]);

  // =========================
  // REGISTER
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

        alert(
          "Lengkapi semua data"
        );

        return;

      }

      setLoading(true);

      // =========================
      // CHECK MEMBER
      // =========================
      const {
        data: existingMember,
      } = await supabase
        .from("members")
        .select("id")
        .eq(
          "whatsapp",
          whatsapp
        )
        .maybeSingle();

      if (existingMember) {

        alert(
          "Nomor WhatsApp sudah terdaftar"
        );

        setLoading(false);

        return;

      }

      // =========================
      // GENERATE REFERRAL CODE
      // =========================
      const randomNumber =
        Math.floor(
          100000 +
          Math.random() * 900000
        );

      const referralCode =
        `DAN${randomNumber}`;

      // =========================
      // FIND SPONSOR
      // =========================
      let referrerId = null;

      if (sponsorCode) {

        const {
          data: sponsor,
        } = await supabase
          .from("members")
          .select("id")
          .eq(
            "referral_code",
            sponsorCode
          )
          .maybeSingle();

        if (sponsor) {

          referrerId =
            sponsor.id;

        }

      }

      // =========================
      // INSERT MEMBER
      // =========================
      const {
        data,
        error,
      } = await supabase
        .from("members")
        .insert([
          {
            name,
            whatsapp,
            alamat,
            kota,
            password,

            referral_code:
              referralCode,

            sponsor_code:
              sponsorCode || null,

            referrer_id:
              referrerId,

            status:
              "pending",
          },
        ])
        .select()
        .single();

      if (error) {

        console.log(error);

        alert(
          "Registrasi gagal"
        );

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

      router.push(
        "/produk"
      );

    };

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-zinc-900
          border
          border-cyan-500/20
          rounded-3xl
          p-6
          md:p-8
        "
      >

        {/* HEADER */}
        <div className="mb-8">

          <div
            className="
              flex
              items-center
              gap-4
              mb-6
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-cyan-400
                text-black
                flex
                items-center
                justify-center
                text-2xl
                font-black
              "
            >

              DAN

            </div>

            <div>

              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-bold
                  text-cyan-400
                "
              >

                Registrasi Member

              </h1>

              <p
                className="
                  text-zinc-400
                  mt-2
                "
              >

                Affiliate Digital Modern

              </p>

            </div>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >

          {/* NAMA */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                text-zinc-400
              "
            >

              Nama Lengkap

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Masukkan nama lengkap"
              className="
                w-full
                bg-black
                border
                border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* WHATSAPP */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                text-zinc-400
              "
            >

              Nomor WhatsApp

            </label>

            <input
              type="text"
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
                border
                border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* ALAMAT */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                text-zinc-400
              "
            >

              Alamat Lengkap

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
                border
                border-zinc-700
                rounded-2xl
                p-4
                min-h-[120px]
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* KOTA */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                text-zinc-400
              "
            >

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
                border
                border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                text-zinc-400
              "
            >

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
                border
                border-zinc-700
                rounded-2xl
                p-4
                outline-none
                focus:border-cyan-400
              "
            />

          </div>

          {/* SPONSOR */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                text-zinc-400
              "
            >

              Kode Referral

            </label>

            <input
              type="text"
              value={sponsorCode}
              readOnly
              placeholder="Kode referral otomatis"
              className="
                w-full
                bg-zinc-800
                border
                border-cyan-500/20
                rounded-2xl
                p-4
                text-cyan-400
                font-bold
                outline-none
              "
            />

          </div>

          {/* INFO BONUS */}
          <div
            className="
              bg-black
              border
              border-cyan-500/20
              rounded-2xl
              p-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                flex-wrap
              "
            >

              <div>

                <p
                  className="
                    text-cyan-400
                    font-bold
                  "
                >

                  Bonus Sponsor

                </p>

                <p
                  className="
                    text-zinc-400
                    text-sm
                    mt-1
                  "
                >

                  Diberikan sekali saat referral aktivasi

                </p>

              </div>

              <div
                className="
                  bg-green-500/10
                  border
                  border-green-500/20
                  text-green-400
                  px-4
                  py-2
                  rounded-xl
                  font-bold
                "
              >

                BONUS SEKALI

              </div>

            </div>

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

  );

}
