"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  // =========================
  // STATE
  // =========================
  const [members, setMembers] =
    useState([]);

  const [withdraws, setWithdraws] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const [menu, setMenu] =
    useState("dashboard");

  const [search, setSearch] =
    useState("");

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

  // =========================
  // CHECK LOGIN
  // =========================
  useEffect(() => {

    const adminLogin =
      localStorage.getItem("admin");

    if (adminLogin === "true") {
      setIsAdmin(true);
    }

    getData();

  }, []);

  // =========================
  // GET DATA
  // =========================
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

    // WITHDRAW
    const { data: withdrawData } =
      await supabase
        .from("withdraws")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setWithdraws(withdrawData || []);

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

  };

  // =========================
  // LOGIN
  // =========================
  if (!isAdmin) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

        <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-8 w-full max-w-md">

          <h1 className="text-4xl font-bold text-cyan-400 mb-6">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Password Admin"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          />

          <button
            onClick={() => {

              if (
                password === "admin123"
              ) {

                localStorage.setItem(
                  "admin",
                  "true"
                );

                setIsAdmin(true);

              } else {

                alert(
                  "Password salah"
                );

              }

            }}
            className="w-full mt-5 bg-cyan-400 text-black py-3 rounded-2xl font-bold"
          >
            Login Admin
          </button>

        </div>

      </main>

    );

  }

  // =========================
  // FILTER MEMBER
  // =========================
  const filteredMembers =
    members.filter((member) => {

      return (
        member.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        member.whatsapp
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        member.referral_code
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    });

  // =========================
  // TOP MEMBER
  // =========================
  const topMembers =
    [...members]
      .sort(
        (a, b) =>
          Number(
            b.total_referral || 0
          ) -
          Number(
            a.total_referral || 0
          )
      )
      .slice(0, 5);

  return (

    <main className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <div className="w-[260px] bg-zinc-950 border-r border-cyan-500/20 p-6 hidden lg:block">

        <h1 className="text-4xl font-bold text-cyan-400">
          DAN
        </h1>

        <div className="mt-10 space-y-3">

          {[
            "dashboard",
            "members",
            "withdraw",
            "add-product",
            "products",
            "orders",
            "history",
          ].map((item) => (

            <button
              key={item}
              onClick={() =>
                setMenu(item)
              }
              className={`w-full text-left px-5 py-3 rounded-2xl font-bold capitalize ${
                menu === item
                  ? "bg-cyan-400 text-black"
                  : "bg-zinc-900 text-white"
              }`}
            >
              {item.replace("-", " ")}
            </button>

          ))}

          <button
            onClick={() => {

              localStorage.removeItem(
                "admin"
              );

              window.location.reload();

            }}
            className="w-full bg-red-500 px-5 py-3 rounded-2xl font-bold mt-8"
          >
            Logout
          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-5xl font-bold text-cyan-400">
              Admin Dashboard
            </h1>

            <p className="text-zinc-400 mt-3">
              Digital Affiliate Network
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-400">
              Total Member
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-4">
              {members.length}
            </h2>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-400">
              Total Produk
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-4">
              {products.length}
            </h2>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-400">
              Withdraw
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-4">
              {withdraws.length}
            </h2>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-400">
              Transaksi
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-4">
              {transactions.length}
            </h2>

          </div>

        </div>

        {/* TOP MEMBER */}
        <div className="bg-zinc-900 rounded-3xl p-6 mb-8">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            Top 5 Member
          </h2>

          <div className="space-y-4">

            {topMembers.map(
              (member, index) => (

              <div
                key={member.id}
                className="flex items-center justify-between bg-black rounded-2xl p-4"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    #{index + 1}
                    {" "}
                    {member.name}
                  </h3>

                  <p className="text-zinc-400 mt-1">
                    Referral:
                    {" "}
                    {member.total_referral || 0}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-green-400 font-bold">
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

        {/* MEMBERS */}
        {menu === "members" && (

          <div>

            <div className="bg-zinc-900 rounded-3xl p-6 mb-6">

              <input
                type="text"
                placeholder="Cari member..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
              />

             {/* ADD PRODUCT */}
{menu === "add-product" && (

  <div className="bg-zinc-900 rounded-3xl p-6">

    <h2 className="text-3xl font-bold text-cyan-400 mb-6">
      Tambah Produk
    </h2>

    <div className="grid gap-4">

      <input
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
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
        className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
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
        className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
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
        className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
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
        className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
      />

      <button
        onClick={async () => {

          if (
            !name ||
            !category ||
            !price
          ) {

            alert(
              "Lengkapi data produk"
            );

            return;

          }

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

    {/* PRODUCTS */}
{menu === "products" && (

  <div className="grid gap-5">

    {products.map((product) => (

      <div
        key={product.id}
        className="bg-zinc-900 rounded-3xl p-6"
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

            <div className="bg-yellow-500 text-black px-3 py-1 rounded-xl font-bold">

              AKTIVASI

            </div>

          )}

        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-black rounded-2xl p-4">

            <p className="text-zinc-400 text-sm">
              Harga
            </p>

            <p className="text-green-400 text-2xl font-bold mt-2">

              Rp{" "}
              {Number(
                product.price || 0
              ).toLocaleString()}

            </p>

          </div>

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

        </div>

        <div className="mt-5">

          <p className="text-yellow-400 font-bold">

            Bonus Referral:
            {" "}
            {product.referral_bonus_percent || 0}%

          </p>

        </div>

        <div className="flex flex-wrap gap-3 mt-6">

          {/* PRODUK AKTIVASI */}
          <button
            onClick={async () => {

              await supabase
                .from("products")
                .update({
                  is_activation:
                    false,
                })
                .neq("id", 0);

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

              alert(
                "Produk aktivasi diganti"
              );

              getData();

            }}
            className="bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
          >
            Jadikan Aktivasi
          </button>

          {/* STATUS */}
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
            className="bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold"
          >

            {product.status ===
            "active"
              ? "Nonaktifkan"
              : "Aktifkan"}

          </button>

          {/* DELETE */}
          <button
            onClick={async () => {

              const confirmDelete =
                confirm(
                  "Hapus produk?"
                );

              if (!confirmDelete)
                return;

              await supabase
                .from("products")
                .delete()
                .eq(
                  "id",
                  product.id
                );

              getData();

            }}
            className="bg-red-500 px-5 py-3 rounded-2xl font-bold"
          >
            Hapus
          </button>

        </div>

      </div>

    ))}

  </div>

)}

  </div>

)} 

            </div>

            <div className="grid gap-5">

              {filteredMembers.map(
                (member) => (

                <div
                  key={member.id}
                  className="bg-zinc-900 rounded-3xl p-6"
                >

                  <h2 className="text-3xl font-bold">
                    {member.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {member.whatsapp}
                  </p>

                  <div className="mt-5 space-y-2">

                    <p className="text-cyan-400">
                      Referral:
                      {" "}
                      {member.referral_code}
                    </p>

                    <p className="text-green-400 font-bold">
                      Rp{" "}
                      {Number(
                        member.saldo || 0
                      ).toLocaleString()}
                    </p>

                    <p className="text-yellow-400">
                      {member.status}
                    </p>

                  </div>

                  {/* AKTIVASI */}
                  {member.status ===
                    "pending" && (

                    <button
                      onClick={async () => {

                        await supabase
                          .from(
                            "members"
                          )
                          .update({
                            status:
                              "active",
                          })
                          .eq(
                            "id",
                            member.id
                          );

                        alert(
                          "Member diaktivasi"
                        );

                        getData();

                      }}
                      className="mt-5 bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
                    >
                      Aktivasi Member
                    </button>

                  )}

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </main>

  );

}
