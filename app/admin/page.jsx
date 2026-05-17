"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {

    const { data, error } = await supabase
      .from("members")
      .select("*");

    if (data) {
      setMembers(data);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">
        Admin Dashboard
      </h1>
      <h2 className="text-zinc-400 mb-6">
  Total Member: {members.length}
</h2>

      <div className="grid gap-5">

        {members.map((member) => (

          <div
            key={member.id}
            className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
          >

            <h2 className="text-2xl font-bold">
              {member.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {member.whatsapp}
            </p>

            <p className="text-cyan-400 mt-3">
              Referral:
              {" "}
              {member.referral_code}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}
