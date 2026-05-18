"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  // ======================
  // STATE
  // ======================
  const [members, setMembers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const [withdraws, setWithdraws] =
    useState([]);

  const [menu, setMenu] =
    useState("dashboard");

  // FORM PRODUK
  const [name, setName] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [profit, setProfit] =
    useState("");

  const [
    referralBonus,
    setReferralBonus,
  ] = useState("");

  // ======================
  // GET DATA
  // ======================
  useEffect(() => {

    getData();

  }, []);

  const getData = async () => {

    // MEMBERS
    const { data: memberData } =
      await supabase
        .from("members")
        .select("*")
        .order("saldo", {
          ascending: false,
        });

    setMembers(memberData || []);

    // PRODUCTS
    const { data: productData } =
      await supabase
        .from("products")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setProducts(productData || []);

    // TRANSACTIONS
    const { data: trxData } =
      await supabase
        .from("transactions")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setTransactions(trxData || []);

    // WITHDRAW
    const { data: wdData } =
      await supabase
        .from("withdraws")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setWithdraws(wdData || []);

  };

  return (

    <main className="min-h-screen bg-black text-white p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 leading-none">
          Admin
          <br />
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-4 text-lg md:text-xl">
          Digital Affiliate Network
        </p>

      </div>

      {/* LAYOUT */}
      <div className="grid md:grid-cols-12 gap-5">

        {/* SIDEBAR */}
        <div className="md:col-span-4">

          <div className="bg-zinc-900 rounded-3xl p-4 md:sticky md:top-4">

            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">

              <button
                onClick={() =>
                  setMenu("dashboard")
                }
                className={`p-4 rounded-2xl text-left font-bold text-sm md:text-base ${
                  menu === "dashboard"
                    ? "bg-cyan-400 text-black"
                    : "bg-black"
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() =>
                  setMenu("add-product")
                }
                className={`p-4 rounded-2xl text-left font-bold text-sm md:text-base ${
                  menu === "add-product"
                    ? "bg-cyan-400 text-black"
                    : "bg-black"
                }`}
              >
                Tambah Produk
              </button>

              <button
                onClick={() =>
                  setMenu("products")
                }
                className={`p-4 rounded-2xl text-left font-bold text-sm md:text-base ${
                  menu === "products"
                    ? "bg-cyan-400 text-black"
                    : "bg-black"
                }`}
              >
                Atur Produk
              </button>

              <button
                onClick={() =>
                  setMenu("members")
                }
                className={`p-4 rounded-2xl text-left font-bold text-sm md:text-base ${
                  menu === "members"
                    ? "bg-cyan-400 text-black"
                    : "bg-black"
                }`}
              >
                Daftar Member
              </button>

              <button
                onClick={() =>
                  setMenu("transactions")
                }
                className={`p-4 rounded-2xl text-left font-bold text-sm md:text-base ${
                  menu === "transactions"
                    ? "bg-cyan-400 text-black"
                    : "bg-black"
                }`}
              >
                Histori
              </button>

              <button
                onClick={() =>
                  setMenu("withdraw")
                }
                className={`p-4 rounded-2xl text-left font-bold text-sm md:text-base ${
                  menu === "withdraw"
                    ? "bg-cyan-400 text-black"
                    : "bg-black"
                }`}
              >
                Withdraw
              </button>

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="md:col-span-8">

          {/* DASHBOARD */}
          {menu === "dashboard" && (

            <div>

              {/* STATISTIK */}
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-zinc-900 rounded-3xl p-5">

                  <p className="text-zinc-400 text-sm md:text-xl">
                    Total Member
                  </p>

                  <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mt-5">
                    {members.length}
                  </h2>

                </div>

                <div className="bg-zinc-900 rounded-3xl p-5">

                  <p className="text-zinc-400 text-sm md:text-xl">
                    Total Produk
                  </p>

                  <h2 className="text-4xl md:text-6xl font-bold text-green-400 mt-5">
                    {products.length}
                  </h2>

                </div>

                <div className="bg-zinc-900 rounded-3xl p-5">

                  <p className="text-zinc-400 text-sm md:text-xl">
                    Withdraw
                  </p>

                  <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mt-5">
                    {withdraws.length}
                  </h2>

                </div>

                <div className="bg-zinc-900 rounded-3xl p-5">

                  <p className="text-zinc-400 text-sm md:text-xl">
                    Transaksi
                  </p>

                  <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mt-5">
                    {transactions.length}
                  </h2>

                </div>

              </div>

              {/* TOP MEMBER */}
              <div className="bg-zinc-900 rounded-3xl p-5 md:p-6 mt-8">

                <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-8">
                  Top 5 Member
                </h2>

                <div className="grid gap-5">

                  {members
                    .slice(0, 5)
                    .map((member, index) => (

                      <div
                        key={member.id}
                        className="bg-black rounded-3xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                      >

                        <div>

                          <h3 className="text-2xl md:text-3xl font-bold">
                            #{index + 1} {member.name}
                          </h3>

                          <p className="text-zinc-400 mt-2 text-base md:text-xl">
                            Referral:
                            {" "}
                            {member.total_referral || 0}
                          </p>

                        </div>

                        <div>

                          <p className="text-green-400 text-2xl md:text-3xl font-bold">

                            Rp{" "}
                            {Number(
                              member.saldo || 0
                            ).toLocaleString()}

                          </p>

                        </div>

                      </div>

                    ))}

                </div>

              </div>

            </div>

          )}

          {/* ADD PRODUCT */}
          {menu === "add-product" && (

            <div className="bg-zinc-900 rounded-3xl p-5 md:p-6">

              <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-8">
                Tambah Produk
              </h2>

              <div className="grid gap-4">

                <input
                  type="text"
                  placeholder="Nama Produk"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="bg-black rounded-2xl px-4 py-4"
                />

                <input
                  type="text"
                  placeholder="Kategori"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="bg-black rounded-2xl px-4 py-4"
                />

                <input
                  type="number"
                  placeholder="Harga Produk"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  className="bg-black rounded-2xl px-4 py-4"
                />

                <input
                  type="number"
                  placeholder="Profit"
                  value={profit}
                  onChange={(e) =>
                    setProfit(
                      e.target.value
                    )
                  }
                  className="bg-black rounded-2xl px-4 py-4"
                />

                <input
                  type="number"
                  placeholder="Bonus Referral (%)"
                  value={referralBonus}
                  onChange={(e) =>
                    setReferralBonus(
                      e.target.value
                    )
                  }
                  className="bg-black rounded-2xl px-4 py-4"
                />

                <button
                  onClick={async () => {

                    await supabase
                      .from("products")
                      .insert([
                        {
                          name,
                          category,
                          price:
                            Number(price),
                          profit:
                            Number(profit),
                          referral_bonus_percent:
                            Number(
                              referralBonus
                            ),
                          status:
                            "active",
                          is_activation:
                            false,
                        },
                      ]);

                    alert(
                      "Produk berhasil ditambah"
                    );

                    setName("");
                    setCategory("");
                    setPrice("");
                    setProfit("");
                    setReferralBonus("");

                    getData();

                  }}
                  className="bg-cyan-400 text-black py-4 rounded-2xl font-bold"
                >
                  Tambah Produk
                </button>

              </div>

            </div>

          )}

          {/* PRODUCTS */}
          {menu === "products" && (

            <div className="grid gap-5">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="bg-zinc-900 rounded-3xl p-5 md:p-6"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h2 className="text-2xl md:text-3xl font-bold text-cyan-400">
                        {product.name}
                      </h2>

                      <p className="text-zinc-400 mt-2">
                        {product.category}
                      </p>

                    </div>

                    {product.is_activation && (

                      <div className="bg-yellow-500 text-black px-3 py-2 rounded-xl font-bold text-center">
                        PRODUK AKTIVASI
                      </div>

                    )}

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-black rounded-2xl p-4">

                      <p className="text-zinc-400 text-sm">
                        Harga
                      </p>

                      <h3 className="text-green-400 text-xl md:text-3xl font-bold mt-2">

                        Rp{" "}
                        {Number(
                          product.price || 0
                        ).toLocaleString()}

                      </h3>

                    </div>

                    <div className="bg-black rounded-2xl p-4">

                      <p className="text-zinc-400 text-sm">
                        Profit
                      </p>

                      <h3 className="text-cyan-400 text-xl md:text-3xl font-bold mt-2">

                        Rp{" "}
                        {Number(
                          product.profit || 0
                        ).toLocaleString()}

                      </h3>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <button
                      onClick={async () => {

                        await supabase
                          .from("products")
                          .update({
                            is_activation:
                              false,
                          })
                          .neq(
                            "id",
                            0
                          );

                        await supabase
                          .from("products")
                          .update({
                            is_activation:
                              true,
                          })
                          .eq(
                            "id",
                            product.id
                          );

                        getData();

                      }}
                      className="bg-cyan-400 text-black px-4 py-3 rounded-2xl font-bold text-sm"
                    >
                      Jadikan Aktivasi
                    </button>

                    <button
                      onClick={async () => {

                        await supabase
                          .from("products")
                          .update({
                            status:
                              product.status ===
                              "active"
                                ? "inactive"
                                : "active",
                          })
                          .eq(
                            "id",
                            product.id
                          );

                        getData();

                      }}
                      className="bg-yellow-500 text-black px-4 py-3 rounded-2xl font-bold text-sm"
                    >

                      {product.status ===
                      "active"
                        ? "Nonaktifkan"
                        : "Aktifkan"}

                    </button>

                    <button
                      onClick={async () => {

                        await supabase
                          .from("products")
                          .delete()
                          .eq(
                            "id",
                            product.id
                          );

                        getData();

                      }}
                      className="bg-red-500 px-4 py-3 rounded-2xl font-bold text-sm"
                    >
                      Hapus
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* MEMBERS */}
          {menu === "members" && (

            <div className="grid gap-5">

              {members.map((member) => (

                <div
                  key={member.id}
                  className="bg-zinc-900 rounded-3xl p-5 md:p-6"
                >

                  <h2 className="text-2xl md:text-3xl font-bold">
                    {member.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {member.whatsapp}
                  </p>

                  <p className="text-green-400 text-xl md:text-2xl font-bold mt-4">

                    Rp{" "}
                    {Number(
                      member.saldo || 0
                    ).toLocaleString()}

                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>

  );

}
