"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {

  // =========================
  // STATE
  // =========================
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [sponsorCode, setSponsorCode] = useState("");

  const [loginWhatsapp, setLoginWhatsapp] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  const [member, setMember] = useState(null);

  const [withdrawAmount, setWithdrawAmount] =
    useState("");

  const [withdrawHistory, setWithdrawHistory] =
    useState([]);

  const [totalReferral, setTotalReferral] =
    useState(0);

  // =========================
  // GET REF FROM URL
  // =========================
  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const ref = params.get("ref");

    if (ref) {
      setSponsorCode(ref);
    }

  }, []);

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async () => {

    const referralCode =
      "DAN" + Math.floor(Math.random() * 999999);

    const { error } = await supabase
      .from("members")
      .insert([
        {
          name,
          whatsapp,
          password,
          sponsor_code: sponsorCode,
          referral_code: referralCode,
          status: "free",
          saldo: 0,
        },
      ]);

    if (error) {

      console.log(error);
      alert("Register gagal");

    } else {

      alert("Register berhasil");

    }

  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("whatsapp", loginWhatsapp)
      .eq("password", loginPassword)
      .single();

    if (error || !data) {

      alert("Login gagal");

    } else {

      localStorage.setItem(
        "member",
        JSON.stringify(data)
      );

      alert("Login berhasil");

      window.location.reload();

    }

  };

  // =========================
  // GET MEMBER
  // =========================
  useEffect(() => {

    const getMember = async () => {

      const localMember = JSON.parse(
        localStorage.getItem("member")
      );

      if (!localMember) return;

      const { data } = await supabase
        .from("members")
        .select("*")
        .eq("id", localMember.id)
        .single();

      if (data) {

        setMember(data);

        localStorage.setItem(
          "member",
          JSON.stringify(data)
        );

      }

    };

    getMember();

  }, []);

  // =========================
  // GET REFERRAL
  // =========================
  useEffect(() => {

    const getReferral = async () => {

      if (!member?.referral_code) return;

      const { data } = await supabase
        .from("members")
        .select("*")
        .eq(
          "sponsor_code",
          member.referral_code
        );

      if (data) {
        setTotalReferral(data.length);
      }

    };

    getReferral();

  }, [member]);

  // =========================
  // WITHDRAW HISTORY
  // =========================
  useEffect(() => {

    const getWithdrawHistory = async () => {

      if (!member) return;

      const { data } = await supabase
        .from("withdraws")
        .select("*")
        .eq("member_id", member.id)
        .order("id", {
          ascending: false,
        });

      setWithdrawHistory(data || []);

    };

    getWithdrawHistory();

  }, [member]);

  // =========================
  // WITHDRAW
  // =========================
  const handleWithdraw = async () => {

    if (!withdrawAmount) {
      alert("Masukkan nominal");
      return;
    }

    if (Number(withdrawAmount) < 25000) {
      alert("Minimal withdraw Rp 25.000");
      return;
    }

    if (
      Number(withdrawAmount) >
      Number(member?.saldo || 0)
    ) {
      alert("Saldo tidak cukup");
      return;
    }

    const { error } = await supabase
      .from("withdraws")
      .insert([
        {
          member_id: member.id,
          name: member.name,
          whatsapp: member.whatsapp,
          amount: withdrawAmount,
          status: "pending",
        },
      ]);

    if (error) {

      console.log(error);
      alert("Withdraw gagal");

    } else {

      await supabase
        .from("members")
        .update({
          saldo:
            Number(member.saldo || 0) -
            Number(withdrawAmount),
        })
        .eq("id", member.id);

      alert("Withdraw berhasil");

      window.location.reload();

    }

  };

  // =========================
  // MEMBER DASHBOARD
  // =========================
  if (member) {

    return (

      <main className="min-h-screen bg-black text-white p-6">

        <h1 className="text-4xl font-bold text-cyan-400">
          Dashboard Member
        </h1>

        {/* CARD */}
        <div className="mt-10 bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

          <p className="text-zinc-400">
            Nama Member
          </p>

          <h2 className="text-3xl font-bold">
            {member.name}
          </h2>

          {/* REFERRAL */}
          <div className="mt-6">

            <p className="text-zinc-400">
              Kode Referral
            </p>

            <h3 className="text-2xl text-cyan-400 font-bold">
              {member.referral_code}
            </h3>

          </div>

          {/* SALDO */}
          <div className="mt-6">

            <p className="text-zinc-400">
              Saldo Bonus
            </p>

            <h3 className="text-3xl font-bold text-green-400">
              Rp{" "}
              {Number(
                member.saldo || 0
              ).toLocaleString()}
            </h3>

          </div>

          {/* STATUS */}
          <div className="mt-6">

            <p className="text-zinc-400">
              Status Member
            </p>

            <div className="flex items-center gap-3 mt-4">

              <span
                className={`px-4 py-2 rounded-xl font-bold ${
                  member.status === "active"
                    ? "bg-green-500 text-white"
                    : member.status === "pending"
                    ? "bg-yellow-500 text-black"
                    : "bg-zinc-700 text-white"
                }`}
              >
                {member.status === "active"
                  ? "AKTIF"
                  : member.status === "pending"
                  ? "PENDING"
                  : "FREE"}
              </span>

              {member.status !== "active" &&
                member.status !== "pending" && (
                <button
                  onClick={async () => {

                    await supabase
                      .from("members")
                      .update({
                        status: "pending",
                      })
                      .eq("id", member.id);

                    alert(
                      "Request aktivasi dikirim"
                    );

                    window.location.reload();

                  }}
                  className="bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
                >
                  Aktivasi Sekarang
                </button>
              )}

            </div>

            {member.status === "pending" && (

              <div className="mt-4 bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold">

                Menunggu Approve Admin

              </div>

            )}

          </div>

          {/* TOTAL REFERRAL */}
          <div className="mt-6">

            <p className="text-zinc-400">
              Total Referral
            </p>

            <h3 className="text-3xl font-bold text-cyan-400">
              {totalReferral}
            </h3>

          </div>

          {/* BUTTON */}
          <div className="flex gap-3 mt-6">

            <button
              onClick={() => {

                navigator.clipboard.writeText(
                  member.referral_code
                );

                alert(
                  "Kode referral disalin"
                );

              }}
              className="bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
            >
              Copy Referral
            </button>

            <button
              onClick={() => {

                navigator.clipboard.writeText(
                  `${window.location.origin}/?ref=${member.referral_code}`
                );

                alert(
                  "Link referral disalin"
                );

              }}
              className="border border-cyan-400 text-cyan-400 px-5 py-3 rounded-2xl font-bold"
            >
              Copy Link
            </button>

          </div>

        </div>

        {/* WITHDRAW */}
        <div className="mt-10 bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Withdraw Bonus
          </h2>

          <p className="text-yellow-400 mb-4">
            Minimal withdraw Rp 25.000
          </p>

          <input
            type="number"
            placeholder="Nominal withdraw"
            value={withdrawAmount}
            onChange={(e) =>
              setWithdrawAmount(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <button
            onClick={handleWithdraw}
            className="w-full mt-5 bg-green-500 text-white py-3 rounded-2xl font-bold"
          >
            Request Withdraw
          </button>

        </div>

        {/* HISTORY */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Riwayat Withdraw
          </h2>

          {withdrawHistory.length === 0 ? (

            <p className="text-zinc-400">
              Belum ada withdraw
            </p>

          ) : (

            <div className="space-y-4">

              {withdrawHistory.map((item) => (

                <div
                  key={item.id}
                  className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-5"
                >

                  <p className="text-2xl font-bold text-green-400">
                    Rp{" "}
                    {Number(
                      item.amount
                    ).toLocaleString()}
                  </p>

                  <p
                    className={`mt-2 font-bold ${
                      item.status === "success"
                        ? "text-green-400"
                        : item.status ===
                          "rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {

            localStorage.removeItem(
              "member"
            );

            window.location.reload();

          }}
          className="mt-8 bg-red-500 px-6 py-3 rounded-2xl font-bold"
        >
          Logout
        </button>

      </main>

    );

  }

  // =========================
  // LANDING PAGE
  // =========================
  return (

    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold text-cyan-400">
        DAN
      </h1>

      <p className="text-zinc-400 mt-4">
        Digital Affiliate Network
      </p>

      {/* LOGIN */}
      <div className="mt-10 bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Login Member
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="WhatsApp"
            value={loginWhatsapp}
            onChange={(e) =>
              setLoginWhatsapp(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) =>
              setLoginPassword(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-400 text-black py-3 rounded-2xl font-bold"
          >
            Login
          </button>

        </div>

      </div>

      {/* REGISTER */}
      <div className="mt-10 bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          Register Member
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) =>
              setWhatsapp(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Kode Referral"
            value={sponsorCode}
            onChange={(e) =>
              setSponsorCode(
                e.target.value
              )
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-cyan-400 text-black py-3 rounded-2xl font-bold"
          >
            Register
          </button>

        </div>

      </div>

    </main>

  );

}
