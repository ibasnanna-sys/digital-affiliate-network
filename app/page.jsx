"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {

  const router = useRouter();

  useEffect(() => {

    router.replace("/login");

  }, []);

  return (

    <main
      className="
        min-h-screen
        bg-black
        flex
        items-center
        justify-center
        text-white
      "
    >

      <h1
        className="
          text-3xl
          font-bold
          text-cyan-400
        "
      >

        Loading...

      </h1>

    </main>

  );

}
