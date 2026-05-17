"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {

  const [members, setMembers] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
const [password, setPassword] = useState("");

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
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3"
        />

        <button
  onClick={() => {

    if (password === "admin123") {

      localStorage.setItem("admin", "true");

      setIsAdmin(true);

    } else {

      alert("Password salah");

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
        
        <div className="space-y-5 mt-6">

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
        Rp {Number(item.amount).toLocaleString()}
      </p>

      <p className="text-yellow-400 mt-3">
        Status: {item.status}
      </p>

      <div className="flex gap-3 mt-5">

        <button
          onClick={async () => {

            await supabase
              .from("withdraws")
              .update({
                status: "success",
              })
              .eq("id", item.id);

            const memberData = members.find(
              (m) => m.whatsapp === item.whatsapp
            );

            if (memberData) {

              const newSaldo =
                Number(memberData.saldo || 0) -
                Number(item.amount || 0);

              await supabase
                .from("members")
                .update({
                  saldo: newSaldo,
                })
                .eq("id", memberData.id);

            }

            getMembers();

          }}
          className="bg-green-500 px-5 py-3 rounded-2xl font-bold"
        >
          Selesaikan
        </button>

        <button
          onClick={async () => {

            await supabase
              .from("withdraws")
              .update({
                status: "rejected",
              })
              .eq("id", item.id);

            getMembers();

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


    </main>
  );
}
