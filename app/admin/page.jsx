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
