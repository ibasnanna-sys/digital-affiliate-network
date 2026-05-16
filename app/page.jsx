
export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'black',
        color: 'white',
        padding: '40px',
        fontFamily: 'Arial',
      }}
    >
      <h1 style={{ color: '#00ffff', fontSize: '40px' }}>
        Digital Affiliate Network
      </h1>

      <p style={{ marginTop: '20px', fontSize: '20px' }}>
        Pakai sendiri, bonus mengalir.
      </p>

      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          border: '1px solid #00ffff',
          borderRadius: '20px',
        }}
      >
        <h2>Bonus Referral</h2>

        <ul>
          <li>Paket Data → 20%</li>
          <li>Pulsa & Top Up → 10%</li>
          <li>PPOB → 5%</li>
        </ul>
      </div>
    </main>
  )
}
