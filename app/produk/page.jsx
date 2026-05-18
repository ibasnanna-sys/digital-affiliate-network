"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProdukPage() {

  const [member, setMember] =
    useState(null);

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [buyingId, setBuyingId] =
    useState(null);

  // =========================
  // GET MEMBER & PRODUCTS
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
        .eq("status", "active")
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
  const handleBuyProduct =
    async (product) => {

      if (!member) {

        alert("Silakan login");

        return;

      }

      setBuyingId(product.id);

      // =========================
      // INSERT TRANSACTION
      // =========================
      const { error } =
        await supabase
          .from("transactions")
          .insert([
            {
              member_id:
                member.id,

              member_name:
                member.name,

              whatsapp:
                member.whatsapp,

              product_name:
                product.name,

              category:
                product.category,

              amount:
                product.price,

              profit:
                product.profit,

              sponsor_bonus:
                Math.floor(
                  Number(
                    product.profit || 0
                  ) *
                  Number(
                    product.referral_bonus_percent || 0
                  ) / 100
                ),

              status:
                "pending",
            },
          ]);

      if (error) {

        console.log(error);

        alert("Order gagal");

        setBuyingId(null);

        return;

      }

      // =========================
      // PRODUK AKTIVASI
      // =========================
      if (
        product.is_activation &&
        member.status !== "active"
      ) {

        const updatedMember = {
          ...member,
          status: "active",
        };

        await supabase
          .from("members")
          .update({
            status: "active",
          })
          .eq("id", member.id);

        setMember(updatedMember);

        localStorage.setItem(
          "member",
          JSON.stringify(updatedMember)
        );

      }

      alert(
        "Order berhasil masuk"
      );

      setBuyingId(null);

    };

  return (

    <main className="min-h-screen bg-black text-white p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-8 md:mb-10">

        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400">

          Produk Digital

        </h1>

        <p className="text-zinc-400 mt-3 text-sm md:text-base">

          Paket Data, Pulsa, PPOB

        </p>

      </div>

      {/* MEMBER INFO */}
      {member && (

        <div className="
          bg-zinc-900
          border border-cyan-500/20
          rounded-3xl
          p-5 md:p-6
          mb-8
        ">

          <h2 className="text-2xl md:text-3xl font-bold break-words">

            {member.name}

          </h2>

          <p className="text-zinc-400 mt-2 break-all">

            {member.whatsapp}

          </p>

          <div className="mt-5">

            <span
              className={`px-4 py-2 rounded-xl font-bold text-sm ${
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

            Memuat produk...

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

      {/* PRODUCTS */}
      {!loading && products.length > 0 && (

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        ">

          {products.map((product) => (

            <div
              key={product.id}
              className="
                bg-zinc-900
                border border-cyan-500/20
                rounded-3xl
                p-5
                transition-all
                hover:border-cyan-400
                hover:scale-[1.01]
              "
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 break-words">

                    {product.name}

                  </h2>

                  <p className="text-zinc-400 mt-2 text-sm md:text-base">

                    {product.category}

                  </p>

                </div>

                {product.is_activation && (

                  <div className="
                    bg-yellow-500
                    text-black
                    px-3
                    py-1
                    rounded-xl
                    text-xs
                    md:text-sm
                    font-bold
                    whitespace-nowrap
                  ">

                    AKTIVASI

                  </div>

                )}

              </div>

              {/* PRICE */}
              <div className="mt-6">

                <p className="text-zinc-400 text-sm">

                  Harga Produk

                </p>

                <h3 className="text-3xl md:text-4xl font-bold text-green-400 mt-2 break-words">

                  Rp{" "}
                  {Number(
                    product.price || 0
                  ).toLocaleString()}

                </h3>

              </div>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-black rounded-2xl p-4">

                  <p className="text-zinc-400 text-xs md:text-sm">

                    Profit

                  </p>

                  <p className="text-cyan-400 text-lg md:text-2xl font-bold mt-2 break-words">

                    Rp{" "}
                    {Number(
                      product.profit || 0
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="bg-black rounded-2xl p-4">

                  <p className="text-zinc-400 text-xs md:text-sm">

                    Bonus Referral

                  </p>

                  <p className="text-green-400 text-lg md:text-2xl font-bold mt-2">

                    {product.referral_bonus_percent || 0}%

                  </p>

                </div>

              </div>

              {/* BUTTON */}
              <button
                disabled={
                  buyingId === product.id
                }
                onClick={() =>
                  handleBuyProduct(
                    product
                  )
                }
                className="
                  w-full
                  mt-8
                  bg-cyan-400
                  text-black
                  py-4
                  rounded-2xl
                  font-bold
                  transition-all
                  hover:bg-cyan-300
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                {buyingId === product.id
                  ? "Memproses..."
                  : "Beli Produk"}

              </button>

            </div>

          ))}

        </div>

      )}

    </main>

  );

}
