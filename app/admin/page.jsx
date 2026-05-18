
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

  const [category, setCategory] =
    useState("");

  const [modalPrice, setModalPrice] =
    useState("");

  const [sellPrice, setSellPrice] =
    useState("");

  const [profit, setProfit] =
    useState("");

  const [
    bonusReferral,
    setBonusReferral,
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
  // DASHBOARD
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
                    : member.status === "pending"
                    ? "text-yellow-400"
                    : "text-zinc-400"
                }`}
              >

                Status:
                {" "}

                {member.status === "active"
                  ? "AKTIF"
                  : member.status === "pending"
                  ? "PENDING"
                  : "FROZEN"}

              </p>

              {/* BUTTON AKTIVASI */}
              {member.status ===
                "pending" && (

                <button
                  onClick={async () => {

                    // AKTIFKAN MEMBER
                    await supabase
                      .from("members")
                      .update({
                        status: "active",
                      })
                      .eq(
                        "id",
                        member.id
                      );

                    // BONUS SPONSOR
                    if (
                      member.sponsor_code
                    ) {

                      const {
                        data: sponsor,
                      } =
                        await supabase
                          .from(
                            "members"
                          )
                          .select("*")
                          .eq(
                            "referral_code",
                            member.sponsor_code
                          )
                          .single();

                      if (sponsor) {

                        await supabase
                          .from(
                            "members"
                          )
                          .update({
                            saldo:
                              Number(
                                sponsor.saldo ||
                                  0
                              ) + 1000,

                            total_referral:
                              Number(
                                sponsor.total_referral ||
                                  0
                              ) + 1,
                          })
                          .eq(
                            "id",
                            sponsor.id
                          );

                      }

                    }

                    alert(
                      "Member berhasil diaktivasi"
                    );

                    getData();

                  }}
                  className="mt-5 bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold"
                >
                  Aktivasi Member
                </button>

              )}

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

                    const memberData =
                      members.find(
                        (m) =>
                          m.whatsapp ===
                          item.whatsapp
                      );

                    if (memberData) {

                      const newSaldo =
                        Number(
                          memberData.saldo || 0
                        ) +
                        Number(
                          item.amount || 0
                        );

                      await supabase
                        .from("members")
                        .update({
                          saldo:
                            newSaldo,
                        })
                        .eq(
                          "id",
                          memberData.id
                        );

                    }

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
              placeholder="Harga Modal"
              value={modalPrice}
              onChange={(e) =>
                setModalPrice(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Harga Jual"
              value={sellPrice}
              onChange={(e) =>
                setSellPrice(
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
              value={bonusReferral}
              onChange={(e) =>
                setBonusReferral(
                  e.target.value
                )
              }
              className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
            />

            <button
              onClick={async () => {

                await supabase
                  .from("products")
                  .insert([
                    {
                      name:
                        productName,

                      category,

                      modal_price:
                        Number(
                          modalPrice
                        ),

                      sell_price:
                        Number(
                          sellPrice
                        ),

                      profit:
                        Number(
                          profit
                        ),

                      bonus_referral:
                        Number(
                          bonusReferral
                        ),

                      status: true,

                      is_activation: false,
                    },
                  ]);

                alert(
                  "Produk berhasil ditambah"
                );

                setProductName("");
                setCategory("");
                setModalPrice("");
                setSellPrice("");
                setProfit("");
                setBonusReferral("");

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

              <p className="text-zinc-400 mt-2">
                {product.category}
              </p>

              <div className="mt-5 space-y-2">

                <p className="text-cyan-400">

                  Harga Jual:
                  {" "}
                  Rp{" "}
                  {Number(
                    product.sell_price || 0
                  ).toLocaleString()}

                </p>

                <p className="text-green-400">

                  Profit:
                  {" "}
                  Rp{" "}
                  {Number(
                    product.profit || 0
                  ).toLocaleString()}

                </p>

                <p className="text-yellow-400">

                  Bonus Referral:
                  {" "}
                  {product.bonus_referral || 0}%

                </p>

                <p
                  className={`font-bold ${
                    product.status
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {product.status
                    ? "AKTIF"
                    : "NONAKTIF"}

                </p>

                {product.is_activation && (

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
                        is_activation: false,
                      })
                      .neq("id", 0);

                    await supabase
                      .from("products")
                      .update({
                        is_activation: true,
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
                        status:
                          !product.status,
                      })
                      .eq(
                        "id",
                        product.id
                      );

                    getData();

                  }}
                  className="bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold"
                >
                  {product.status
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

      {/* LOGOUT */}
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
