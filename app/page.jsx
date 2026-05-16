export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom, #020617, #000000)',
        color: 'white',
        fontFamily: 'Arial',
        padding: '30px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            paddingTop: '60px',
            paddingBottom: '60px',
          }}
        >
          <h1
            style={{
              fontSize: '55px',
              color: '#00ffff',
              marginBottom: '20px',
            }}
          >
            Digital Affiliate Network
          </h1>

          <p
            style={{
              fontSize: '22px',
              color: '#cbd5e1',
            }}
          >
            Pakai sendiri, bonus mengalir.
          </p>

          <button
            style={{
              marginTop: '40px',
              background: '#00ffff',
              color: 'black',
              border: 'none',
              padding: '18px 35px',
              borderRadius: '18px',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            Gabung Sekarang
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',
            gap: '25px',
            marginTop: '40px',
          }}
        >
          {[
            ['Paket Data', '20%'],
            ['Pulsa & Top Up', '10%'],
            ['PPOB', '5%'],
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: '#0f172a',
                border: '1px solid #00ffff33',
                padding: '30px',
                borderRadius: '25px',
              }}
            >
              <h2
                style={{
                  color: '#00ffff',
                  marginBottom: '15px',
                }}
              >
                {item[0]}
              </h2>

              <p
                style={{
                  fontSize: '35px',
                  fontWeight: 'bold',
                }}
              >
                {item[1]}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '80px',
            background: '#0f172a',
            padding: '40px',
            borderRadius: '30px',
            border: '1px solid #00ffff33',
          }}
        >
          <h2
            style={{
              color: '#00ffff',
              marginBottom: '20px',
              fontSize: '35px',
            }}
          >
            Keuntungan Member
          </h2>

          <ul
            style={{
              lineHeight: '2',
              color: '#cbd5e1',
              fontSize: '18px',
            }}
          >
            <li>Tanpa deposit saldo</li>
            <li>Aktif hanya dengan pembelian paket data</li>
            <li>Bonus referral otomatis</li>
            <li>Sistem 1 level direct referral</li>
            <li>Maintenance bonus Rp200/hari</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
