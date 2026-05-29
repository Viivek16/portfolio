import React, { useRef, useEffect } from 'react';

const ThreePillars = () => {
  // Removed JS scroll listener in favor of native CSS sticky stacking

  return (
    <>
      <section
        id="three-pillars"
        style={{
          position: 'relative',
          padding: '40px 4vw 0',
        }}
      >
        {/* ── Section Heading ── */}
        <div className="sticky top-[10vh] z-50 pb-8 pt-4 pointer-events-none">
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '9.5px',
            letterSpacing: '0.24em',
            color: '#0AC4E0',
            marginBottom: '12px',
          }}>
            — THREE PILLARS
          </p>
          <h2 style={{
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(48px, 6vw, 64px)',
            color: '#F8F7F4',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            margin: 0,
          }}>
            The Work<span style={{ color: '#0AC4E0' }}>.</span>
          </h2>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 300,
            fontSize: '12.5px',
            color: 'rgba(248,247,244,0.52)',
            lineHeight: 1.9,
            maxWidth: '420px',
            marginTop: '16px',
          }}>
            Six years across Web3, capital markets and growth infrastructure — three domains where I operate with full conviction.
          </p>
        </div>

        {/* ── Card Container — native sticky stacking ── */}
        <div className="pb-0 flex flex-col gap-[40vh] relative mt-8 w-full max-w-5xl mx-auto">
          {/* CARD 1 — VC */}
          <div
            className="gc gc1 sticky top-[25vh] z-10 bg-[#0a0f16]/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden"
            style={{ minHeight: '50vh' }}
          >
            {/* ── existing Card 1 content — DO NOT CHANGE TEXT OR STATS ── */}
            {/* Grid layout: text left, image right */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
              <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* Label */}
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                    01 / VENTURE CAPITAL
                  </p>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, color: '#F8F7F4', marginBottom: '20px' }}>
                    The Deal Maker.
                  </h3>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, color: 'rgba(248,247,244,0.72)', maxWidth: '520px' }}>
                    From evaluating 800+ decks to managing $200M+ AUM across four funds — built from inside the table, not above it. My edge is founder empathy: I've signed term sheets and felt payroll anxiety in equal measure.
                  </p>
                </div>
                {/* Pills */}
                <div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                    {['NewTribe Capital', 'DCF', 'Leo Ventures', 'Asva'].map(label => (
                      <span key={label} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 400, border: '1px solid rgba(248,247,244,0.20)', borderRadius: '100px', padding: '4px 14px', color: 'rgba(248,247,244,0.70)' }}>
                        {label}
                      </span>
                    ))}
                  </div>
                  {/* Stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {[['$200M+', 'AUM MANAGED'], ['450+', 'KOL NETWORK'], ['4', 'FUNDS BUILT'], ['250+', 'PROJECTS']].map(([num, label]) => (
                      <div key={label}>
                        <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>{num}</p>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(248,247,244,0.45)', marginTop: '4px' }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right image panel */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0 20px 20px 0' }}>
                <img
                  src="/images/work/vc-hero.jpg"
                  alt="Venture Capital"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B2D72, #0992C2 60%, #0AC4E0)';
                    e.currentTarget.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-style:italic;font-size:28px;color:rgba(248,247,244,0.4)">Venture Capital</div>`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* CARD 2 — Marketing & Growth */}
          <div
            className="gc gc2 sticky top-[29vh] z-20 bg-[#0a0f16]/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden"
            style={{ minHeight: '50vh' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', height: '100%' }}>
              <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                    02 / MARKETING & GROWTH
                  </p>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, color: '#F8F7F4', marginBottom: '20px' }}>
                    The Signal Amplifier.
                  </h3>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, color: 'rgba(248,247,244,0.72)', maxWidth: '520px' }}>
                    GTM architecture that moves markets. From zero-traction to $10M Series A acquisition — distribution is the moat most founders forget to build until it is already too late.
                  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                    {['NODO', 'Nordek', '20+ Events', '14 Cities'].map(label => (
                      <span key={label} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 400, border: '1px solid rgba(248,247,244,0.20)', borderRadius: '100px', padding: '4px 14px', color: 'rgba(248,247,244,0.70)' }}>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div>
                      <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>320%</p>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '11px', color: 'rgba(248,247,244,0.6)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Growth YoY</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>14M+</p>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '11px', color: 'rgba(248,247,244,0.6)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Impressions</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>5+</p>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '11px', color: 'rgba(248,247,244,0.6)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Acquisitions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0 20px 20px 0' }}>
                <img
                  src="/images/work/marketing-hero.jpg"
                  alt="Marketing & Growth"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B1A4A, #0B2D72 50%, #0992C2)';
                    e.currentTarget.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-style:italic;font-size:28px;color:rgba(248,247,244,0.4)">Marketing & Growth</div>`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* CARD 3 — AI Tools */}
          <div
            className="gc gc3 sticky top-[33vh] z-30 bg-[#0a0f16]/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden"
            style={{ minHeight: '50vh' }}
          >
            <div style={{ padding: '48px' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                03 / AI & TOOLS
              </p>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, color: '#F8F7F4', marginBottom: '20px' }}>
                The Code Alchemist.
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, color: 'rgba(248,247,244,0.72)' }}>
                  Six live products built at the intersection of AI and Web3. Not side projects — tools actively used by real portfolios, real traders, and real travelers.
                </p>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, color: 'rgba(248,247,244,0.52)' }}>
                  Triply, Yellow Capital Website, Yellow Capital CRM, Tradepoint, BingX Assistant, Fincal — each one solving a specific friction point in the Web3 operator stack.
                </p>
              </div>
            </div>
          </div>

        </div>{/* end card-container */}
      </section>
    </>
  );
};

export default ThreePillars;
