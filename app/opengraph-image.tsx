import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ObedNGL'
export const size = { width: 1200, height: 630 }

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: 20,
            letterSpacing: -2,
          }}
        >
          ObedNGL
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Tous ce que tu as peur de dire en classe,
          faut dire ça ici
        </div>
        <div
          style={{
            marginTop: 40,
            padding: '12px 32px',
            background: '#0ea5e9',
            borderRadius: 999,
            color: '#ffffff',
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          🔒 100% Anonyme
        </div>
      </div>
    ),
    { ...size }
  )
}
