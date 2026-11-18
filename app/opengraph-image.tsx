import { ImageResponse } from 'next/og';

export const alt = 'Chinmoy Kalita — A Story Still Unfolding';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
        backgroundColor: 'rgb(0, 0, 0)',
        backgroundImage:
          'radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.15), transparent 40%), radial-gradient(circle at 20% 80%, rgba(244, 63, 94, 0.12), transparent 45%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'rgb(251, 191, 36)',
          }}
        />
        <span
          style={{
            color: 'rgb(251, 191, 36)',
            letterSpacing: '0.25em',
            fontSize: '14px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          A STORY STILL UNFOLDING
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h1
          style={{
            fontSize: '68px',
            fontWeight: 700,
            color: 'rgb(255, 255, 255)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Chinmoy Kalita
        </h1>
        <p
          style={{
            fontSize: '24px',
            color: 'rgb(161, 161, 170)',
            lineHeight: 1.4,
            maxWidth: '850px',
            margin: 0,
          }}
        >
          An interactive documentary portfolio tracing systems engineering, creative expression, and
          AI frontiers.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '28px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            color: 'rgb(212, 212, 216)',
            letterSpacing: '0.05em',
          }}
        >
          chinmoyk.ie
        </span>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            color: 'rgb(113, 113, 122)',
            fontSize: '14px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Story Mode</span>
          <span>•</span>
          <span>Explore Mode</span>
          <span>•</span>
          <span>Epilogue</span>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
