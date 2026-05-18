"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {
  const [member, setMember] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // GET MEMBER FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const localMember = JSON.parse(localStorage.getItem("member"));
    if (localMember) setMember(localMember);

    getTransactions();
    getProducts();
  }, []);

  // =========================
  // GET TRANSACTIONS
  // =========================
  const getTransactions = async () => {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("id", { ascending: false })
      .limit(10);
    setTransactions(data || []);
  };

  // =========================
  // GET PRODUCTS
  // =========================
  const getProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("id", { ascending: true });
    setProducts(data || []);
    setLoading(false);
  };

  // =========================
  // BUY PRODUCT
  // =========================
  const handleBuyProduct = async (product) => {
    if (!member) return alert("Silakan login");

    const { error } = await supabase.from("transactions").insert([
      {
        member_id: member.id,
        member_name: member.name,
        whatsapp: member.whatsapp,
        product_name: product.name,
        category: product.category,
        amount: product.price,
        profit: product.profit,
        sponsor_bonus: Math.floor(
          (Number(product.profit) *
            Number(product.referral_bonus_percent || 0)) /
            100
        ),
        status: "pending",
      },
    ]);

    if (error) return alert("Order gagal");

    // Jika produk aktivasi
    if (product.is_activation && member.status !== "active") {
      await supabase
        .from("members")
        .update({ status: "active" })
        .eq("id", member.id);
    }

    alert("Order berhasil");
    getTransactions();
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
            Halo, {member.name}
          </h1>
          <p className="text-zinc-400 mt-2">Member Code: {member.member_code}</p>
        </div>
        <div>
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
        </div>
      </div>

      {/* STATISTIK CEPAT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Referral Langsung</p>
          <p className="text-2xl font-bold text-cyan-400 mt-2">12</p>
        </div>
        <div className="bg-zinc-900 border border-green-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Referral Jaringan</p>
          <p className="text-2xl font-bold text-green-400 mt-2">58</p>
        </div>
        <div className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Bonus Sponsor</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">Rp150.000</p>
        </div>
        <div className="bg-zinc-900 border border-purple-500/20 rounded-2xl p-4 text-center">
          <p className="text-zinc-400">Bonus Transaksi</p>
          <p className="text-2xl font-bold text-purple-400 mt-2">Rp275.000</p>
        </div>
      </div>

      {/* LIVE TRANSAKSI */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          Aktivitas Realtime Member
        </h2>
        <div className="relative overflow-hidden bg-zinc-900 border border-cyan-500/20 rounded-3xl p-4">
          <div className="flex gap-4 w-max animate-[marquee_35s_linear_infinite]">
            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="min-w-[300px] bg-black border border-zinc-800 rounded-2xl p-4"
              >
                <p className="text-zinc-400 text-sm">{trx.category}</p>
                <h3 className="font-bold mt-1">{trx.member_name}</h3>
                <p className="text-zinc-400 mt-2">Nominal: Rp{Number(trx.amount).toLocaleString()}</p>
                <span
                  className={`px-2 py-1 text-xs rounded-xl font-bold ${
                    trx.status === "pending"
                      ? "bg-yellow-500 text-black"
                      : trx.status === "success"
                      ? "bg-green-500 text-black"
                      : "bg-zinc-700 text-white"
                  }`}
                >
                  {trx.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Produk Digital</h2>
        {loading ? (
          <p className="text-zinc-400">Memuat produk...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-4"
              >
                <h3 className="text-xl font-bold text-cyan-400">{product.name}</h3>
                <p className="text-zinc-400">{product.category}</p>
                <p className="text-green-400 text-2xl font-bold mt-2">
                  Rp{Number(product.price).toLocaleString()}
                </p>
                <button
                  onClick={() => handleBuyProduct(product)}
                  className="w-full mt-4 bg-cyan-400 text-black py-2 rounded-xl font-bold hover:bg-cyan-300 transition"
                >
                  Beli Produk
                </button>
                {product.is_activation && (
                  <div className="bg-yellow-500 text-black px-2 py-1 rounded-xl text-xs font-bold mt-2">
                    AKTIVASI
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PROFIL & LOGOUT */}
      <section>
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Profil Member</h2>
        <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">
          <p>Nama: {member.name}</p>
          <p>WhatsApp: {member.whatsapp}</p>
          <p>Kota: {member.kota}</p>
          <p>Alamat: {member.alamat}</p>
          <button
            onClick={() => {
              localStorage.removeItem("member");
              window.location.reload();
            }}
            className="mt-4 bg-red-500 text-black py-2 px-4 rounded-xl font-bold hover:bg-red-400 transition"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
            }
