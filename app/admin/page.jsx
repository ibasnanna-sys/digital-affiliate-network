"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  const [members, setMembers] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {

    const { data } = await supabase
      .from("members")
.select("*")
.order("saldo", { ascending: false });

    if (data) {
      setMembers(data);
      const { data: withdrawData } = await supabase
  .from("withdraws")
  .select("*")
  .order("id", { ascending: false });

setWithdraws(withdrawData || []);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold text-cyan-400">
        Admin Dashboard
      </h1>

      <p className="text-zinc-400 mt-3 mb-10">
        Total Member: {members.length}
      </p>

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

          </div>

        ))}

      </div>

      <div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Withdraw Request
  </h2>

  <div className="grid gap-5">

    {withdraws.map((item) => (

      <div
        key={item.id}
        className="bg-zinc-900 border border-cyan-500/20 rounded-3xl p-6"
      >

        <h3 className="text-2xl font-bold">
          {item.name}
        </h3>

        <p className="text-zinc-400 mt-2">
          Rp {Number(item.amount).toLocaleString()}
        </p>

        <p className="text-yellow-400 mt-3">
          {item.status}
        </p>

      </div>

    ))}

  </div>

</div>

    </main>
  );
}
