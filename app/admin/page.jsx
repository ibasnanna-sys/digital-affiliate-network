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

</div>
