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

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [password, setPassword] =
    useState("");

  // FORM PRODUK
  const [productName, setProductName] =
    useState("");

  const [sellPrice, setSellPrice] =
    useState("");

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

  };

  // =========================
  // LOGIN ADMIN
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
  // DASHBOARD ADMIN
  // =========================
  return (

    <main className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <h1 className="text-5xl font-bold text-cyan-400">
        Admin Dashboard
      </h1>

      <p className="text-zinc-400 mt-3 mb-10">
        Total Member:
        {" "}
        {members.length}
      </p>

      {/* =========================
      MEMBER LIST
      ========================= */}
      <div className="grid gap-5">

        {members.map((member, index) => (

          <div
            key={member.id}
            className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
          >

            <p className="text-cyan-400 font-bold mb-3">
              #{index + 1}
            </p>

            <h2 className="text-3xl font-bold">
              {member.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {member.whatsapp}
            </p>

            <p className="text-cyan-400 mt-4">
              Referral:
              {" "}
              {member.referral_code}
            </p>

            <div className="mt-5 space-y-2">

              <p className="text-green-400 font-bold">

                Saldo:
                {" "}
                Rp{" "}
                {Number(
                  member.saldo || 0
                ).toLocaleString()}

              </p>

              <p className="text-cyan-400">

                Total Referral:
                {" "}
                {member.total_referral || 0}

              </p>

              <p
                className={`font-bold ${
                  member.status === "active"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >

                Status:
                {" "}

                {member.status === "active"
                  ? "AKTIF"
                  : "PENDING"}

              </p>

            </div>

          </div>

        ))}

      </div>

      {/* =========================
      WITHDRAW
      ========================= */}
      <div className="mt-14">

        <h2 className="text-4xl font-bold mb-8">
          Withdraw Request
        </h2>

        <div className="space-y-5">

          {withdraws.map((item) => (

            <div
              key={item.id}
              className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
            >

              <h3 className="text-2xl font-bold">
                {item.name}
              </h3>

              <p className="text-zinc-400 mt-2">
                {item.whatsapp}
              </p>

              <p className="text-green-400 text-2xl font-bold mt-4">

                Rp{" "}
                {Number(
                  item.amount
                ).toLocaleString()}

              </p>

              <p className="text-yellow-400 mt-3">

                Status:
                {" "}
                {item.status}

              </p>

              <div className="flex gap-3 mt-5">

                {/* APPROVE */}
                <button
                  onClick={async () => {

                    await supabase
                      .from("withdraws")
                      .update({
                        status:
                          "success",
                      })
                      .eq(
                        "id",
                        item.id
                      );

                    getData();

                  }}
                  className="bg-green-500 px-5 py-3 rounded-2xl font-bold"
                >
                  Selesaikan
                </button>

                {/* REJECT */}
                <button
                  onClick={async () => {

                    await supabase
                      .from("withdraws")
                      .update({
                        status:
                          "rejected",
                      })
                      .eq(
                        "id",
                        item.id
                      );

                    getData();

                  }}
                  className="bg-red-500 px-5 py-3 rounded-2xl font-bold"
                >
                  Tolak
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =========================
      PRODUCT MANAGEMENT
      ========================= */}
      <div className="mt-14">

        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          Management Produk
        </h2>

        {/* FORM */}
        <div className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6">

          <h3 className="text-2xl font-bold mb-6">
            Tambah Produk
          </h3>

          <div className="grid gap-4">

            <input
              type="text"
              placeholder="Nama Produk"
              value={productName}
              onChange={(e) =>
                setProductName(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Harga Produk"
              value={sellPrice}
              onChange={(e) =>
                setSellPrice(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            {/* TAMBAH PRODUK */}
            <button
              onClick={async () => {

                const { error } =
                  await supabase
                    .from("products")
                    .insert([
                      {
                        name:
                          productName,

                        price:
                          Number(
                            sellPrice
                          ),

                        is_active: true,

                        is_activation_product: false,
                      },
                    ]);

                if (error) {

                  console.log(error);

                  alert(
                    "Gagal tambah produk"
                  );

                  return;
                }

                alert(
                  "Produk berhasil ditambah"
                );

                setProductName("");
                setSellPrice("");

                getData();

              }}
              className="bg-cyan-400 text-black py-3 rounded-2xl font-bold"
            >
              Tambah Produk
            </button>

          </div>

        </div>

        {/* LIST PRODUK */}
        <div className="grid gap-5 mt-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
            >

              <h3 className="text-2xl font-bold">
                {product.name}
              </h3>

              <div className="mt-5 space-y-2">

                <p className="text-cyan-400">

                  Harga:
                  {" "}
                  Rp{" "}
                  {Number(
                    product.price || 0
                  ).toLocaleString()}

                </p>

                <p
                  className={`font-bold ${
                    product.is_active
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {product.is_active
                    ? "AKTIF"
                    : "NONAKTIF"}

                </p>

                {product.is_activation_product && (

                  <div className="bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold inline-block">

                    PRODUK AKTIVASI

                  </div>

                )}

              </div>

              <div className="flex flex-wrap gap-3 mt-6">

                {/* PRODUK AKTIVASI */}
                <button
                  onClick={async () => {

                    await supabase
                      .from("products")
                      .update({
                        is_activation_product: false,
                      })
                      .neq("id", 0);

                    await supabase
                      .from("products")
                      .update({
                        is_activation_product: true,
                      })
                      .eq(
                        "id",
                        product.id
                      );

                    alert(
                      "Produk aktivasi berhasil diganti"
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
                        is_active:
                          !product.is_active,
                      })
                      .eq(
                        "id",
                        product.id
                      );

                    getData();

                  }}
                  className="bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold"
                >
                  {product.is_active
                    ? "Nonaktifkan"
                    : "Aktifkan"}
                </button>

                {/* HAPUS */}
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

      </div>

      {/* =========================
      LOGOUT
      ========================= */}
      <button
        onClick={() => {

          localStorage.removeItem(
            "admin"
          );

          window.location.reload();

        }}
        className="mt-10 bg-red-500 px-6 py-3 rounded-2xl font-bold"
      >
        Logout Admin
      </button>

    </main>

  );

}
