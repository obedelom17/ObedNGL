import "./globals.css";

export const metadata = {
  title: "ObedNGL — Dis ce que tu penses vraiment",
  description:
    "Ce que tu as peur de dire en Classe, dis-le ici. Anonyme. Sans jugement. Pour tout le monde.",
  metadataBase: new URL("https://obedngl.vercel.app"),
  openGraph: {
    title: "ObedNGL — Dis ce que tu penses vraiment",
    description:
      "Ce que tu as peur de dire en Classe, dis-le ici. Anonyme. Sans jugement.",
    url: "https://obedngl.vercel.app",
    siteName: "ObedNGL",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ObedNGL — Messages anonymes",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ObedNGL — Dis ce que tu penses vraiment",
    description:
      "Ce que tu as peur de dire en Classe, dis-le ici. Anonyme. Sans jugement.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
