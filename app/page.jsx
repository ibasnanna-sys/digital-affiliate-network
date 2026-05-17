"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
const [name, setName] = useState("");
const [whatsapp, setWhatsapp] = useState("");
const [password, setPassword] = useState("");
const [sponsorCode, setSponsorCode] = useState("");
  useEffect(() => {
  const params = new URLSearchParams(
    window.location.search
  );

  const ref = params.get("ref");

  if (ref) {
    setSponsorCode(ref);
  }
}, []);
  const [loginWhatsapp, setLoginWhatsapp] =
  useState("");

const [loginPassword, setLoginPassword] =
  useState("");
  const [withdrawAmount, setWithdrawAmount] =
  useState("");
  const [withdrawHistory, setWithdrawHistory] =
  useState([]);

  const [totalReferral, setTotalReferral] =
  useState(0);

  
  
  const handleRegister = async () => {

  const referralCode =
    "DAN" + Math.floor(Math.random() * 999999);

  const { data, error } = await supabase
    .from("members")
    .insert([
      {
        name,
        whatsapp,
        password,
        sponsor_code: sponsorCode,
        referral_code: referralCode,
      },
    ]);

  if (error) {

  alert("Register gagal");
  console.log(error);

} else {

  

  alert("Register berhasil");
    
    if (sponsorCode) {
  coif (sponsorCode) {

  const { data: refMember } = await supabase
    .from("members")
    .select("*")
    .eq("referral_code", sponsorCode)
    .single();

  if (refMember) {

    await supabase
      .from("members")
      .update({
        total_referral:
          (refMember.total_referral || 0) + 1,
      })
      .eq("id", refMember.id);

  }
}
  }
};
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
// HANDLE WITHDRAW
// =========================
const handleWithdraw = async () => {

  // VALIDASI NOMINAL
  if (!withdrawAmount) {
    alert("Masukkan nominal");
    return;
  }

  // MINIMAL WITHDRAW
  if (Number(withdrawAmount) < 25000) {
    alert("Minimal withdraw Rp 25.000");
    return;
  }

  // CEK SALDO MEMBER
  if (
  Number(withdrawAmount) >
  Number(member?.saldo || 0)
) {
  alert("Saldo tidak cukup");
  return;
}

  // SIMPAN REQUEST WITHDRAW
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

  // JIKA ERROR
  if (error) {

    alert("Withdraw gagal");
    console.log(error);

  } else {

    // KURANGI SALDO MEMBER
    await supabase
      .from("members")
      .update({
        saldo:
  Number(member?.saldo || 0) -
  Number(withdrawAmount),
      })
      .eq("id", member.id);

    alert("Request withdraw dikirim");

    window.location.reload();
  }
};

// =========================
// HANDLE TRANSACTION
// =========================
const handleTransaction = async (
  memberId,
  type,
  amount,
  profit,
  sponsorId = null
) => {

  try {

    // CEK STATUS MEMBER
    const { data: memberData, error: memberError } =
      await supabase
        .from("members")
        .select("id, status, frozen_until")
        .eq("id", memberId)
        .single();

    // JIKA ERROR
    if (memberError) {
      console.error(memberError);
      return false;
    }

    // CEK MEMBER ACTIVE
    if (memberData.status !== "active") {
      alert("Member belum aktif");
      return false;
    }

    // CEK MEMBER FROZEN
    if (
      memberData.frozen_until &&
      new Date(memberData.frozen_until) > new Date()
    ) {
      alert("Akun sedang frozen");
      return false;
    }

    // SIMPAN TRANSAKSI
    const { data: trxData, error: trxError } =
      await supabase
        .from("transactions")
        .insert([
          {
            member_id: memberId,
            type,
            amount,
            profit,
            status: "success",
          },
        ])
        .select()
        .single();

    // JIKA TRANSAKSI ERROR
    if (trxError) {
      console.error(trxError);
      return false;
    }

    // HITUNG BONUS MEMBER
    const memberBonus =
      Math.floor(profit * 0.2);

    // CEK DATA BALANCE
    const { data: balanceData } =
      await supabase
        .from("balances")
        .select("*")
        .eq("member_id", memberId)
        .single();

    // UPDATE BALANCE
    if (balanceData) {

      await supabase
        .from("balances")
        .update({
          balance:
            balanceData.balance + memberBonus,
          updated_at: new Date(),
        })
        .eq("member_id", memberId);

    } else {

      // BUAT BALANCE BARU
      await supabase
        .from("balances")
        .insert([
          {
            member_id: memberId,
            balance: memberBonus,
          },
        ]);
    }

    // SIMPAN BONUS TRANSAKSI
    await supabase
      .from("bonuses")
      .insert([
        {
          member_id: memberId,
          transaction_id: trxData.id,
          bonus_type: "transaction",
          amount: memberBonus,
          description:
            "Bonus transaksi member",
        },
      ]);

    // UPDATE LAST TRANSACTION
    await supabase
      .from("members")
      .update({
        last_transaction: new Date(),
      })
      .eq("id", memberId);

    return true;

  } catch (error) {

    console.error(error);
    return false;
  }
};

// =========================
// CHECK FROZEN MEMBERS
// =========================
const checkFrozenMembers = async () => {

  try {

    const today = new Date();

    // AMBIL MEMBER ACTIVE
    const { data: members, error } =
      await supabase
        .from("members")
        .select("*")
        .eq("status", "active");

    // JIKA ERROR
    if (error) {
      console.error(error);
      return;
    }

    // LOOP MEMBER
    for (const member of members) {

      // JIKA BELUM TRANSAKSI
      if (!member.last_transaction) {
        continue;
      }

      const lastTransaction =
        new Date(member.last_transaction);

      // HITUNG SELISIH HARI
      const diffTime =
        today - lastTransaction;

      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );

      // JIKA 60 HARI TIDAK TRANSAKSI
      if (diffDays >= 60) {

        const frozenUntil = new Date();

        frozenUntil.setDate(
          frozenUntil.getDate() + 30
        );

        // UPDATE STATUS FROZEN
        await supabase
          .from("members")
          .update({
            status: "frozen",
            frozen_until: frozenUntil,
          })
          .eq("id", member.id);
      }
    }

  } catch (error) {

    console.error(error);
  }
};
          
  
  useEffect(() => {
  const getReferral = async () => {

    const memberData = JSON.parse(
      localStorage.getItem("member")
    );

    if (!memberData?.referral_code) return;

    const { data } = await supabase
      .from("members")
      .select("*")
      .eq(
        "sponsor_code",
        memberData.referral_code
      );

    if (data) {
      setTotalReferral(data.length);
    }
  };

  getReferral();
}, []);
  
  const [member, setMember] = useState(null);
  useEffect(() => {

  const localMember = JSON.parse(
    localStorage.getItem("member")
  );

  if (localMember) {
    setMember(localMember);
  }

}, []);
  
  useEffect(() => {
    checkFrozenMembers();

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

  const getWithdrawHistory = async () => {

  const memberData = JSON.parse(
    localStorage.getItem("member")
  );

  if (!memberData) return;

  const { data, error } = await supabase
    .from("withdraws")
    .select("*")
    .eq("member_id", memberData.id)
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  setWithdrawHistory(data || []);
};
  useEffect(() => {

  if (member) {
    getWithdrawHistory();
  }

}, [member]);

if (member) {
  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold text-cyan-400">
        Dashboard Member
      </h1>

      <div className="mt-10 bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

        <p className="text-zinc-400">
          Nama Member
        </p>

        <h2 className="text-3xl font-bold">
          {member.name}
        </h2>

        <div className="mt-6">
          <p className="text-zinc-400">
            Kode Referral
          </p>

          <h3 className="text-2xl text-cyan-400 font-bold">
            {member.referral_code}
          </h3>
          
          <div className="mt-6">
  <p className="text-zinc-400">
    Saldo Bonus
  </p>

  <h3 className="text-3xl font-bold text-green-400">
    Rp {member.saldo || 0}
  </h3>
</div>
          <div className="mt-6">
  <p className="text-zinc-400">
    Total Referral
  </p>

  <h3 className="text-3xl font-bold text-cyan-400">
    {totalReferral}
  </h3>
</div>

<div className="flex gap-3 mt-4">

  <button
    onClick={() => {
      navigator.clipboard.writeText(
        member.referral_code
      );

      alert("Kode referral disalin");
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

      alert("Link referral disalin");
    }}
    className="border border-cyan-400 text-cyan-400 px-5 py-3 rounded-2xl font-bold"
  >
    Copy Link
  </button>

</div>
      

</div>


      </div>

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

      <div className="mt-8">
  <h2 className="text-2xl font-bold text-white mb-4">
    Riwayat Withdraw
  </h2>

  {withdrawHistory.length === 0 ? (
    <p className="text-gray-400">
      Belum ada withdraw
    </p>
  ) : (
    <div className="space-y-3">
      {withdrawHistory.map((item) => (
        <div
          key={item.id}
          className="bg-zinc-900 border border-cyan-500 rounded-xl p-4"
        >
          <p className="text-white font-bold">
            Rp {item.amount}
          </p>

<p
  className={`text-sm font-bold ${
    item.status === "success"
      ? "text-green-400"
      : item.status === "rejected"
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

      <button
        onClick={() => {
          localStorage.removeItem("member");
          window.location.reload();
        }}
        className="mt-6 bg-red-500 px-6 py-3 rounded-2xl font-bold"
      >
        Logout
      </button>

    </main>
  );
}
  
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
      <section className="px-6 pb-10">

  <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

    <h2 className="text-3xl font-bold mb-6">
      Login Member
    </h2>

    <div className="space-y-4">

      <input
        type="text"
        placeholder="WhatsApp"
        value={loginWhatsapp}
        onChange={(e) =>
          setLoginWhatsapp(e.target.value)
        }
        className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) =>
          setLoginPassword(e.target.value)
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

</section>
      
      <section className="px-6 pb-10">

  <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-8">

    <h2 className="text-3xl font-bold mb-6">
      Register Member
    </h2>

    <div className="space-y-4">

      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
      />

      <input
        type="text"
        placeholder="WhatsApp"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
      />

      <input
        type="text"
        placeholder="Kode Referral"
        value={sponsorCode}
        onChange={(e) => setSponsorCode(e.target.value)}
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
