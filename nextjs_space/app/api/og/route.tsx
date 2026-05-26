import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') || 'Name'
  const score = parseInt(searchParams.get('score') || '50', 10)
  const origin = searchParams.get('origin') || ''
  const meaning = searchParams.get('meaning') || ''

  const isHomepage = name === 'Namen-Reue-Rechner' || score === 0

  if (isHomepage) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fff5f7 0%, #f3e8ff 50%, #ede9fe 100%)',
            padding: '60px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #e8457c, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
              }}
            >
              NR
            </div>
            <span style={{ fontSize: '42px', fontWeight: 800, color: '#1a1a2e' }}>
              Namen-Reue-Rechner
            </span>
          </div>
          <div style={{ fontSize: '28px', color: '#6b7280', textAlign: 'center', maxWidth: '800px', lineHeight: 1.5 }}>
            Wird dein Kind seinen Namen bereuen? Analysiere jeden Babynamen auf Mobbing-Risiko, Karrierewirkung, internationale Aussprache und Trends.
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            <div style={{ padding: '12px 24px', borderRadius: '12px', background: '#dcfce7', color: '#166534', fontSize: '20px', fontWeight: 600 }}>Sicher</div>
            <div style={{ padding: '12px 24px', borderRadius: '12px', background: '#fef3c7', color: '#92400e', fontSize: '20px', fontWeight: 600 }}>Riskant</div>
            <div style={{ padding: '12px 24px', borderRadius: '12px', background: '#fee2e2', color: '#991b1b', fontSize: '20px', fontWeight: 600 }}>Kritisch</div>
          </div>
          <div style={{ marginTop: '40px', fontSize: '20px', color: '#7c3aed', fontWeight: 600, display: 'flex' }}>
            Kostenlos &bull; Über 450 Namen &bull; DACH-Raum
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  const riskLevel = score <= 30 ? 'Niedriges Risiko' : score <= 60 ? 'Mittleres Risiko' : 'Hohes Risiko'
  const riskEmoji = score <= 30 ? 'Sicher' : score <= 60 ? 'Riskant' : 'Kritisch'
  const scoreColor = score <= 30 ? '#22c55e' : score <= 60 ? '#f59e0b' : '#ef4444'
  const scoreBg = score <= 30 ? '#dcfce7' : score <= 60 ? '#fef3c7' : '#fee2e2'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #fff5f7 0%, #f3e8ff 50%, #ede9fe 100%)',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #e8457c, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: 'white',
              fontWeight: 700,
            }}
          >
            NR
          </div>
          <span style={{ fontSize: '22px', fontWeight: 600, color: '#6b21a8' }}>
            Namen-Reue-Rechner
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: '60px' }}>
          {/* Left: Name info */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ fontSize: '72px', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.1, marginBottom: '16px' }}>
              {name}
            </div>
            {origin && (
              <div style={{ fontSize: '24px', color: '#6b7280', marginBottom: '8px', display: 'flex' }}>
                Herkunft: {origin}
              </div>
            )}
            {meaning && (
              <div style={{ fontSize: '22px', color: '#9ca3af', marginBottom: '24px', display: 'flex' }}>
                {meaning.length > 60 ? meaning.slice(0, 57) + '...' : meaning}
              </div>
            )}
            <div style={{ fontSize: '20px', color: '#7c3aed', fontWeight: 600, display: 'flex' }}>
              Wird dein Kind seinen Namen bereuen?
            </div>
          </div>

          {/* Right: Score circle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: scoreBg,
                border: `6px solid ${scoreColor}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '56px', fontWeight: 800, color: scoreColor }}>
                {score}
              </span>
              <span style={{ fontSize: '16px', color: '#6b7280', marginTop: '-4px' }}>
                von 100
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 600, color: scoreColor }}>
                {riskEmoji} - {riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
          <span style={{ fontSize: '18px', color: '#9ca3af' }}>
            Kostenlose Babynamen-Analyse
          </span>
          <span style={{ fontSize: '18px', color: '#7c3aed', fontWeight: 600 }}>
            namencheck.de
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
