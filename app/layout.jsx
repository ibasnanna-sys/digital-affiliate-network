export const metadata = {
  title: "Digital Affiliate Network",
  description: "Bangun Jaringan, Raih Penghasilan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="overflow-x-hidden bg-black text-white">
        {children}
      </body>
    </html>
  );
}
