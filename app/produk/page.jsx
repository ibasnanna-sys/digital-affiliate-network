```javascript
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProdukPage() {

  // =========================
  // STATE
  // =========================
  const [member, setMember] =
    useState(null);

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // GET MEMBER + PRODUCTS
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

    setLoading(true);

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("status", true)
        .order("id", {
          ascending: true,
        });

    if (error) {

      console.log(error);

    } else {

      setProducts(data || []);

    }

    setLoading(false);

  };

  // =========================
  // BUY PRODUCT
  // =========================
  const handleBuyProduct = async (
    product
  ) => {

    if (!member) {

      alert("Silakan login member");

      return;

    }

    // =========================
    // HITUNG BONUS
    // =========================
    const sponsorBonus =
      Math.floor(
        Number(product.profit || 0) *
        Number(
          product.bonus_referral || 0
        ) / 100
      );

    // =========================
    // SIMPAN TRANSAKSI
    // =========================
    const { error: trxError } =
      await supabase
        .from("transactions")
        .insert([
          {
            member_id:
              member.id,

            product_name:
              product.name,

            category:
              product.category,

            amount:
              Number(
                product.sell_price || 0
              ),

            profit:
              Number(
                product.profit || 0
              ),

            sponsor_bonus:
              sponsorBonus,

            status:
              "success",
          },
        ]);

    if (trxError) {

      console.log(trxError);

      alert("Transaksi gagal");

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

      if (sponsor) {

        await supabase
          .from("members")
          .update({
            saldo:
              Number(
                sponsor.saldo || 0
              ) + sponsorBonus,
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
                Number(
                  sponsor.saldo || 0
                ) + 1000,

              total_referral:
                Number(
                  sponsor.total_referral || 0
                ) + 1,
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

  // =========================
  // UI
  // =========================
  return (

    <main className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-cyan-400">
          Produk Digital
        </h1>

        <p className="text-zinc-400 mt-3">
          Paket Data, Pulsa, PPOB dan Topup
        </p>

      </div>

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
              className={`px-4 py-2 rounded-2xl font-bold ${
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
                : "FROZEN"}

            </span>

          </div>

        </div>

      )}

      {/* LOADING */}
      {loading && (

        <div className="bg-zinc-900 rounded-3xl p-6">

          <p className="text-zinc-400">
            Loading produk...
          </p>

        </div>

      )}

      {/* EMPTY */}
      {!loading &&
        products.length === 0 && (

        <div className="bg-zinc-900 rounded-3xl p-6">

          <p className="text-zinc-400">
            Produk belum tersedia
          </p>

        </div>

      )}

      {/* PRODUCT LIST */}
      <div className="grid gap-5">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
          >

            {/* TOP */}
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

                <div className="bg-yellow-500 text-black px-4 py-2 rounded-2xl font-bold text-sm">

                  AKTIVASI

                </div>

              )}

            </div>

            {/* PRICE */}
            <div className="mt-8">

              <p className="text-zinc-400">
                Harga Produk
              </p>

              <h3 className="text-5xl font-bold text-green-400 mt-2">

                Rp{" "}
                {Number(
                  product.sell_price || 0
                ).toLocaleString()}

              </h3>

            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-black rounded-2xl p-4">

                <p className="text-zinc-400 text-sm">
                  Profit
                </p>

                <p className="text-cyan-400 text-2xl font-bold mt-2">

                  Rp{" "}
                  {Number(
                    product.profit || 0
                  ).toLocaleString()}

                </p>

              </div>

              <div className="bg-black rounded-2xl p-4">

                <p className="text-zinc-400 text-sm">
                  Bonus Referral
                </p>

                <p className="text-green-400 text-2xl font-bold mt-2">

                  {product.bonus_referral || 0}%

                </p>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={() =>
                handleBuyProduct(product)
              }
              className="w-full mt-8 bg-cyan-400 text-black py-4 rounded-2xl font-bold"
            >

              {product.is_activation
                ? "Aktivasi Sekarang"
                : "Beli Produk"}

            </button>

          </div>

        ))}

      </div>

    </main>

  );

}
```
