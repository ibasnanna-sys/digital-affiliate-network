export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom right, #0f172a, #000000, #164e63)',
        color: 'white',
        fontFamily: 'Arial',
      }}
    >
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <div>
          <p
            style={{
              color: '#22d3ee',
              letterSpacing: '4px',
              marginBottom: '20px',
            }}
          >
            DIGITAL AFFILIATE NETWORK
          </p>

          <h1
            style={{
              fontSize: '60px',
              lineHeight: '1.1',
              marginBottom: '25px',
            }}
          >
            Pakai Sendiri,
            <span style={{ color: '#22d3ee' }}>
              {' '}Bonus Mengalir
            </span>
          </h1>

          <p
            style={{
              color: '#cbd5e1',
              fontSize: '20px',
              lineHeight: '1.8',
              marginBottom: '40px',
            }}
          >
            Platform layanan digital modern untuk paket data,
            pulsa, PPOB, dan referral reward otomatis.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                background: '#22d3ee',
                color: 'black',
                border: 'none',
                padding: '16px 30px',
                borderRadius: '18px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Daftar Sekarang
            </button>

            <button
              style={{
                background: 'transparent',
                color: '#22d3ee',
                border: '1px solid #22d3ee',
                padding: '16px 30px',
                borderRadius: '18px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Pelajari Sistem
            </button>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(34,211,238,0.2)',
            borderRadius: '30px',
            padding: '35px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2
            style={{
              color: '#22d3ee',
              marginBottom: '30px',
              fontSize: '30px',
            }}
          >
            Bonus Referral
          </h2>

          {[
            ['Paket Data', '20%'],
            ['Pulsa & Top Up', '10%'],
            ['PPOB', '5%'],
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '20px',
                borderRadius: '20px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{item[0]}</span>

              <span
                style={{
                  color: '#22d3ee',
                  fontWeight: 'bold',
                }}
              >
                {item[1]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
