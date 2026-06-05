export const metadata = {
  title: 'ObedNGL',
  description: 'Tous ce que tu as peur de dire en classe, faut dire ça ici',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
