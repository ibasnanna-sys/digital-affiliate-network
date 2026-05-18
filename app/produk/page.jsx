"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProdukPage() {

  const [member, setMember] = useState(null);

  const [products, setProducts] = useState([]);

  // =========================
  // GET MEMBER
  // =========================
  useEffect(() => {

    const localMember = JSON.parse(
      localStorage.getItem("member")
    );

    if (localMember) {
      setMember(localMember);
    }

    getProducts();

  }, []);

  // =========================
  // GET PRODUCTS
  // =========================
  const getProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("id", { ascending: true });

    if (error) {

      console.log(error);

    } else {

      setProducts(data || []);

    }
  };

  // =========================
  // HANDLE BUY PRODUCT
  // =========================
  const handleBuyProduct = async (
    product
  ) => {

    if (!member) {

      alert("Silakan login member");
      return;

    }

    // SIMPAN TRANSAKSI
    const { error: trxError } =
      await supabase
        .from("transactions")
        .insert([
          {
            member_id: member.id,

            product_name: product.name,

            category: product.category,

            amount: product.price,

            profit: product.profit,

            sponsor_bonus:
              Math.floor(
                Number(product.profit || 0) *
                Number(
                  product.referral_bonus_percent || 0
                ) / 100
              ),

            status: "success",
          },
        ]);

    // ERROR TRANSAKSI
    if (trxError) {

      alert("Transaksi gagal");
      console.log(trxError);

      return;
    }

    // =========================
    // BONUS SPONSOR
    // =========================
    if (member.sponsor_code) {

      const { data: sponsor } =
        await supabase
          .from("members")
          .select("*")
          .eq(
            "referral_code",
            member.sponsor_code
          )
          .single();

      // JIKA ADA SPONSOR
      if (sponsor) {

        const sponsorBonus =
          Math.floor(
            Number(product.profit || 0) *
            Number(
              product.referral_bonus_percent || 0
            ) / 100
          );

        await supabase
          .from("members")
          .update({
            saldo:
              Number(sponsor.saldo || 0) +
              sponsorBonus,
          })
          .eq("id", sponsor.id);
      }
    }

    // =========================
    // PRODUK AKTIVASI
    // =========================
    if (product.is_activation) {

      // BONUS SPONSOR SEKALI
      if (
        member.status !== "active" &&
        member.sponsor_code
      ) {

        const { data: sponsor } =
          await supabase
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

      // UPDATE STATUS MEMBER
      await supabase
        .from("members")
        .update({
          status: "active",
        })
        .eq("id", member.id);
    }

    alert("Transaksi berhasil");

    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">
        Produk Digital
      </h1>

      {/* MEMBER INFO */}
      {member && (

        <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6 mb-8">

          <h2 className="text-3xl font-bold">
            {member.name}
          </h2>

          <p className="text-zinc-400 mt-2">
            {member.whatsapp}
          </p>

          <div className="mt-5">

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
                ? "ACTIVE"
                : member.status === "pending"
                ? "PENDING"
                : "FREE"}
            </span>

          </div>

        </div>

      )}

      {/* PRODUCTS */}
      <div className="grid gap-5">

        {products.length === 0 ? (

          <div className="bg-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-400">
              Produk belum tersedia
            </p>

          </div>

        ) : (

          products.map((product) => (

            <div
              key={product.id}
              className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-3xl font-bold text-cyan-400">
                    {product.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {product.category}
                  </p>

                </div>

                {product.is_activation && (

                  <div className="bg-yellow-500 text-black px-3 py-1 rounded-xl text-sm font-bold">
                    Aktivasi
                  </div>

                )}

              </div>

              <div className="mt-6">

                <p className="text-zinc-400">
                  Harga Produk
                </p>

                <h3 className="text-4xl font-bold text-green-400 mt-2">
                  Rp {Number(product.price || 0).toLocaleString()}
                </h3>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-black rounded-2xl p-4">

                  <p className="text-zinc-400 text-sm">
                    Profit
                  </p>

                  <p className="text-cyan-400 text-2xl font-bold mt-2">
                    Rp {Number(product.profit || 0).toLocaleString()}
                  </p>

                </div>

                <div className="bg-black rounded-2xl p-4">

                  <p className="text-zinc-400 text-sm">
                    Bonus Referral
                  </p>

                  <p className="text-green-400 text-2xl font-bold mt-2">
                    {product.referral_bonus_percent || 0}%
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  handleBuyProduct(product)
                }
                className="w-full mt-8 bg-cyan-400 text-black py-4 rounded-2xl font-bold"
              >
                Beli Produk
              </button>

            </div>

          ))

        )}

      </div>

    </main>
  );
}
