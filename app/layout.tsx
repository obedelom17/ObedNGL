export const metadata = {
  title: 'ObedNGL',
  description: 'Tous ce que tu as peur de dire en classe, faut dire ça ici',
  metadataBase: new URL('https://obedngl.vercel.app'),
  openGraph: {
    title: 'ObedNGL',
    description: 'Tous ce que tu as peur de dire en classe, faut dire ça ici',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ObedNGL',
    description: 'Tous ce que tu as peur de dire en classe, faut dire ça ici',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-[#0a0a0a] text-white">{children}</body>
    </html>
  )
}
