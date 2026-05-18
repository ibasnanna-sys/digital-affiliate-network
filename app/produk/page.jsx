"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProdukPage() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // GET PRODUCTS
  // =========================
  useEffect(() => {

    getProducts();

  }, []);

  const getProducts = async () => {

    setLoading(true);

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("id", {
          ascending: true,
        });

    if (error) {

      console.log(error);

    } else {

      console.log(data);

      setProducts(data || []);

    }

    setLoading(false);

  };

  return (

    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">
        Produk Digital
      </h1>

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

      {/* LIST PRODUK */}
      <div className="grid gap-5">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold text-cyan-400">
                {product.name}
              </h2>

              {product.is_activation_product && (

                <div className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold">

                  Aktivasi

                </div>

              )}

            </div>

            <div className="mt-6">

              <p className="text-zinc-400">
                Harga Produk
              </p>

              <h3 className="text-4xl font-bold text-green-400 mt-2">

                Rp{" "}
                {Number(
                  product.price || 0
                ).toLocaleString()}

              </h3>

            </div>

            <button
              className="w-full mt-8 bg-cyan-400 text-black py-4 rounded-2xl font-bold"
            >
              Beli Produk
            </button>

          </div>

        ))}

      </div>

    </main>

  );

}
