"use client";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto">

        {/* GLOW */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[500px]
            bg-cyan-500/10
            blur-[120px]
            rounded-full
          "
        />

        <div className="relative z-10 max-w-4xl">

          <div
            className="
              inline-flex
              items-center
              gap-2
              border
              border-cyan-500/30
              bg-cyan-500/10
              text-cyan-400
              px-4
              py-2
              rounded-2xl
              text-sm
              font-bold
              mb-6
            "
          >

            DIGITAL AFFILIATE NETWORK

          </div>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
            "
          >

            Bangun
            <span className="text-cyan-400">
              {" "}Bisnis Digital
            </span>

            <br />

            Dari HP Anda

          </h1>

          <p
            className="
              text-zinc-400
              text-lg
              md:text-xl
              mt-8
              leading-relaxed
              max-w-2xl
            "
          >

            Jual paket data, pulsa, PPOB, dan produk digital
            dengan sistem referral modern berbasis member.

          </p>

          {/* BUTTON */}
          <div className="flex flex-wrap gap-4 mt-10">

            <a
              href="/register"
              className="
                bg-cyan-400
                text-black
                px-8
                py-4
                rounded-2xl
                font-bold
                hover:bg-cyan-300
                transition-all
              "
            >

              Register Member

            </a>

            <a
              href="/login"
              className="
                border
                border-cyan-400
                text-cyan-400
                px-8
                py-4
                rounded-2xl
                font-bold
                hover:bg-cyan-400
                hover:text-black
                transition-all
              "
            >

              Login Member

            </a>

          </div>

        </div>

      </section>

      {/* LIVE TRANSAKSI */}
      <section className="px-6 py-20 max-w-7xl mx-auto overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl md:text-4xl font-black text-cyan-400">

              Live Transaksi Member

            </h2>

            <p className="text-zinc-400 mt-3">

              Aktivitas realtime member DAN Digital Network

            </p>

          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
              px-4
              py-2
              rounded-2xl
              text-sm
              font-bold
            "
          >

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            LIVE

          </div>

        </div>

        {/* MARQUEE */}
        <div className="relative overflow-hidden">

          {/* LEFT BLUR */}
          <div
            className="
              absolute
              left-0
              top-0
              w-20
              h-full
              bg-gradient-to-r
              from-black
              to-transparent
              z-10
            "
          />

          {/* RIGHT BLUR */}
          <div
            className="
              absolute
              right-0
              top-0
              w-20
              h-full
              bg-gradient-to-l
              from-black
              to-transparent
              z-10
            "
          />

          {/* ANIMATION */}
          <div
            className="
              flex
              gap-5
              w-max
              animate-[marquee_35s_linear_infinite]
            "
          >

            {[...Array(2)].map((_, loop) => (

              <div key={loop} className="flex gap-5">

                {/* AKTIVASI */}
                <div
                  className="
                    min-w-[320px]
                    bg-zinc-900/90
                    backdrop-blur-xl
                    border
                    border-green-500/20
                    rounded-3xl
                    p-6
                    hover:scale-[1.03]
                    transition-all
                  "
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-green-500/10
                          flex
                          items-center
                          justify-center
                          text-2xl
                        "
                      >

                        ✅

                      </div>

                      <div>

                        <p className="text-zinc-400 text-sm">
                          Aktivasi Member
                        </p>

                        <h3 className="text-xl font-bold mt-1">
                          DAN4821
                        </h3>

                      </div>

                    </div>

                    <span
                      className="
                        bg-green-500/10
                        border
                        border-green-500/20
                        text-green-400
                        text-xs
                        px-3
                        py-1
                        rounded-xl
                        font-bold
                      "
                    >

                      SUCCESS

                    </span>

                  </div>

                  <p className="text-zinc-400 mt-6 leading-relaxed">

                    Member berhasil melakukan aktivasi akun digital.

                  </p>

                  <div className="mt-5 text-xs text-zinc-500">

                    2 detik lalu

                  </div>

                </div>

                {/* PEMBELIAN */}
                <div
                  className="
                    min-w-[320px]
                    bg-zinc-900/90
                    backdrop-blur-xl
                    border
                    border-cyan-500/20
                    rounded-3xl
                    p-6
                    hover:scale-[1.03]
                    transition-all
                  "
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-cyan-500/10
                          flex
                          items-center
                          justify-center
                          text-2xl
                        "
                      >

                        📦

                      </div>

                      <div>

                        <p className="text-zinc-400 text-sm">
                          Pembelian Produk
                        </p>

                        <h3 className="text-xl font-bold mt-1">
                          Paket XL 10GB
                        </h3>

                      </div>

                    </div>

                    <span
                      className="
                        bg-cyan-500/10
                        border
                        border-cyan-500/20
                        text-cyan-400
                        text-xs
                        px-3
                        py-1
                        rounded-xl
                        font-bold
                      "
                    >

                      PAID

                    </span>

                  </div>

                  <p className="text-zinc-400 mt-6 leading-relaxed">

                    Transaksi pembelian produk Rp50.000 berhasil diproses.

                  </p>

                  <div className="mt-5 text-xs text-zinc-500">

                    5 detik lalu

                  </div>

                </div>

                {/* WITHDRAW */}
                <div
                  className="
                    min-w-[320px]
                    bg-zinc-900/90
                    backdrop-blur-xl
                    border
                    border-yellow-500/20
                    rounded-3xl
                    p-6
                    hover:scale-[1.03]
                    transition-all
                  "
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          bg-yellow-500/10
                          flex
                          items-center
                          justify-center
                          text-2xl
                        "
                      >

                        💸

                      </div>

                      <div>

                        <p className="text-zinc-400 text-sm">
                          Withdraw Bonus
                        </p>

                        <h3 className="text-xl font-bold mt-1">
                          Rp125.000
                        </h3>

                      </div>

                    </div>

                    <span
                      className="
                        bg-yellow-500/10
                        border
                        border-yellow-500/20
                        text-yellow-400
                        text-xs
                        px-3
                        py-1
                        rounded-xl
                        font-bold
                      "
                    >

                      SUCCESS

                    </span>

                  </div>

                  <p className="text-zinc-400 mt-6 leading-relaxed">

                    Withdraw bonus referral berhasil dikirim.

                  </p>

                  <div className="mt-5 text-xs text-zinc-500">

                    8 detik lalu

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FITUR */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          <div
            className="
              bg-zinc-900
              border
              border-cyan-500/20
              rounded-3xl
              p-8
            "
          >

            <h3 className="text-2xl font-bold text-cyan-400 mb-4">

              Produk Digital

            </h3>

            <p className="text-zinc-400 leading-relaxed">

              Paket data, pulsa, topup dan PPOB dengan sistem modern.

            </p>

          </div>

          <div
            className="
              bg-zinc-900
              border
              border-cyan-500/20
              rounded-3xl
              p-8
            "
          >

            <h3 className="text-2xl font-bold text-green-400 mb-4">

              Bonus Referral

            </h3>

            <p className="text-zinc-400 leading-relaxed">

              Dapatkan bonus sponsor dan bonus transaksi member.

            </p>

          </div>

          <div
            className="
              bg-zinc-900
              border
              border-cyan-500/20
              rounded-3xl
              p-8
            "
          >

            <h3 className="text-2xl font-bold text-yellow-400 mb-4">

              Full Mobile

            </h3>

            <p className="text-zinc-400 leading-relaxed">

              Sistem responsive dan mudah digunakan langsung dari HP.

            </p>

          </div>

        </div>

      </section>

    </main>

  );

}
