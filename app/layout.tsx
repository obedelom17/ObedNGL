export const metadata = {
  title: 'ObedNGL',
  description: 'Messages anonymes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased text-slate-800">{children}</body>
    </html>
  )
}
