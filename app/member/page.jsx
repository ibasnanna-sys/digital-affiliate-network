"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import QRCode from "react-qr-code";

export default function DashboardPage() {
  const [member, setMember] = useState(null);
  const [membersNetwork, setMembersNetwork] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalMember: 0,
    totalReferral: 0,
    totalSponsorBonus: 0,
    totalTransactionBonus: 0,
  });

  // Ambil member dari localStorage
  useEffect(() => {
    const localMember = JSON.parse(localStorage.getItem("member"));
    if (!localMember) return;
    setMember(localMember);
    fetchNetwork(localMember.id);
    fetchTransactions();
    fetchStats();

    // Realtime update
    const channel = supabase
      .channel("live-member")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "members" },
        () => fetchNetwork(localMember.id)
      )
      .subscribe();

    const transChannel = supabase
      .channel("live-transactions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        () => fetchTransactions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(transChannel);
    };
  }, []);

  // =========================
  // FETCH NETWORK
  // =========================
  const fetchNetwork = async (memberId) => {
    const { data } = await supabase
      .from("members")
      .select("id,name,status,member_code,referrer_id")
      .neq("id", memberId);
    setMembersNetwork(data || []);
  };

  // =========================
  // FETCH TRANSACTIONS
  // =========================
  const fetchTransactions = async () => {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("id", { ascending: false })
      .limit(10);
    setTransactions(data || []);
  };

  // =========================
  // FETCH STATS
  // =========================
  const fetchStats = async () => {
    const { count: totalMember } = await supabase
      .from("members")
      .select("*", { count: "exact" });

    const { data: totalReferralData } = await supabase
      .from("members")
      .select("*")
      .eq("referrer_id", member?.id);

    const { data: sponsorBonusData } = await supabase
      .from("transactions")
      .select("sponsor_bonus");

    const { data: transactionBonusData } = await supabase
      .from("transactions")
      .select("profit");

    setStats({
      totalMember: totalMember || 0,
      totalReferral: totalReferralData?.length || 0,
      totalSponsorBonus:
        sponsorBonusData?.reduce((acc, t) => acc + Number(t.sponsor_bonus || 0), 0) || 0,
      totalTransactionBonus:
        transactionBonusData?.reduce((acc, t) => acc + Number(t.profit || 0), 0) || 0,
    });
  };

  if (!member)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading member...</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
            Halo, {member.name}
          </h1>
          <p className="text-zinc-400 mt-1">Member Code: {member.member_code}</p>
        </div>
        <div className="flex gap-3 items-center">
          <span
            className={`px-4 py-2 rounded-xl font-bold ${
              member.status === "active"
                ? "bg-green-500 text-black"
                : member.status === "pending"
                ? "bg-yellow-500 text-black"
                : "bg-zinc-700 text-white"
            }`}
          >
            {member.status.toUpperCase()}
          </span>
          <div className="bg-black border border-zinc-700 p-2 rounded-xl">
            <QRCode value={`https://domainkamu.com/register?ref=${member.member_code}`} size={64} />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Total Member</p>
          <p className="text-2xl font-bold text-cyan-400 mt-2">{stats.totalMember}</p>
        </div>
        <div className="bg-zinc-900 border border-green-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Referral Langsung</p>
          <p className="text-2xl font-bold text-green-400 mt-2">{stats.totalReferral}</p>
        </div>
        <div className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Bonus Sponsor</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">
            Rp{Number(stats.totalSponsorBonus).toLocaleString()}
          </p>
        </div>
        <div className="bg-zinc-900 border border-purple-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Bonus Transaksi</p>
          <p className="text-2xl font-bold text-purple-400 mt-2">
            Rp{Number(stats.totalTransactionBonus).toLocaleString()}
          </p>
        </div>
      </div>

      {/* SKEMA JARINGAN MATAHARI */}
      <section className="relative bg-zinc-900 border border-cyan-500/20 rounded-[40px] overflow-hidden min-h-[650px] flex items-center justify-center mb-10">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute z-20 w-32 h-32 rounded-full bg-cyan-400 text-black flex flex-col items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.7)] animate-pulse">
          <div className="text-3xl">👑</div>
          <div className="font-black mt-1">ANDA</div>
        </div>
        {membersNetwork.map((m, idx) => {
          const angle = (360 / membersNetwork.length) * idx;
          const radius = 220;
          const top = 50 + radius * Math.sin((angle * Math.PI) / 180) / 300 * 100;
          const left = 50 + radius * Math.cos((angle * Math.PI) / 180) / 300 * 100;
          return (
            <div key={m.id} className="absolute z-20" style={{ top: `${top}%`, left: `${left}%`, transform: "translate(-50%, -50%)" }}>
              <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-center border backdrop-blur-xl animate-bounce bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
                <div className="text-xs font-bold">{m.name}</div>
                <div className="text-[10px] mt-1">{m.status}</div>
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-6 left-6 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-3 rounded-2xl font-bold">
          Bonus Sponsor = Sekali
        </div>
        <div className="absolute bottom-6 right-6 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-5 py-3 rounded-2xl font-bold">
          Bonus Transaksi = Selamanya
        </div>
      </section>

      {/* LEADERBOARD */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Top Referral</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {membersNetwork.slice(0, 5).map((m, idx) => (
            <div key={m.id} className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-4 flex justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Rank #{idx + 1}</p>
                <h3 className="text-lg font-bold">{m.name}</h3>
              </div>
              <p className="font-bold text-green-400">{Math.floor(Math.random() * 20)} referral</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOGOUT */}
      <section>
        <button
          onClick={() => {
            localStorage.removeItem("member");
            window.location.reload();
          }}
          className="bg-red-500 text-black py-2 px-4 rounded-xl font-bold hover:bg-red-400 transition"
        >
          Logout
        </button>
      </section>
    </main>
  );
}
