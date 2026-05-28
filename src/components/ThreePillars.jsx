import React, { useRef, useEffect } from 'react';

const ThreePillars = () => {
  const sectionRef = useRef(null);
  const gc1Ref     = useRef(null);
  const gc2Ref     = useRef(null);
  const gc3Ref     = useRef(null);
  const block1Ref  = useRef(null);
  const block2Ref  = useRef(null);
  const stripRef   = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function eio(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate(p) {
      const gc1    = gc1Ref.current;
      const gc2    = gc2Ref.current;
      const gc3    = gc3Ref.current;
      const b1     = block1Ref.current;
      const b2     = block2Ref.current;

      if (!gc1 || !gc2 || !gc3) return;

      const p2 = clamp((p - 0.1) / 0.35, 0, 1);
      const p3 = clamp((p - 0.5) / 0.35, 0, 1);

      // Card 1 stays top:0, scales slightly
      gc1.style.transform  = `scale(${lerp(1.0, 0.95, p2)}) translateY(0px)`;
      gc1.style.willChange = 'transform';
      
      // Card 2 slides up to overlap Card 1 at 40px
      gc2.style.opacity    = p2 > 0.01 ? '1' : '0';
      const gc2Top = lerp(window.innerHeight, 40, eio(p2));
      gc2.style.transform  = `translateY(${gc2Top}px) scale(${lerp(1.0, 0.95, p3)})`;
      gc2.style.willChange = 'transform, opacity';

      // Card 3 slides up to overlap Card 2 at 80px
      gc3.style.opacity    = p3 > 0.01 ? '1' : '0';
      const gc3Top = lerp(window.innerHeight, 80, eio(p3));
      gc3.style.transform  = `translateY(${gc3Top}px)`;
      gc3.style.willChange = 'transform, opacity';

      // Blockers (dimming)
      if (b1) {
        b1.style.opacity = lerp(0, 0.85, p2);
        b1.style.transform = gc1.style.transform;
      }
      if (b2) {
        b2.style.opacity = lerp(0, 0.85, p3);
        b2.style.transform = gc2.style.transform; // Make blocker 2 follow card 2
      }
    }

    function handleScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const raw = scrolled / maxScroll;
      const p = clamp(raw, 0, 1);

      animate(p);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial state on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="three-pillars"
        style={{
          position: 'relative',
          height: '3400px',
        }}
      >
      {/* ── Sticky Stage ── */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 4vw',
          paddingTop: '40px',
          paddingBottom: '24px',
          overflow: 'visible',
        }}
      >

        {/* ── Section Heading ── */}
        <div style={{ paddingTop: '48px', paddingBottom: '32px', flexShrink: 0 }}>
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

        {/* ── Card Container — all three cards stacked at position absolute inset 0 ── */}
        <div
          style={{
            position: 'relative',
            height: 'calc(100vh - 160px)',
            minHeight: '640px',
          }}
        >
          {/* CARD 1 — VC */}
          <div
            ref={gc1Ref}
            className="gc gc1"
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '100%',
              zIndex: 10,
              transformOrigin: 'top center',
            }}
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

          {/* BLOCKER 1 — hides Card 1 content when Card 2 is fully stacked */}
          <div
            ref={block1Ref}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '100%',
              background: 'rgba(7, 12, 24, 0.75)', 
              backdropFilter: 'blur(20px)',
              opacity: 0, zIndex: 15, pointerEvents: 'none',
              borderRadius: '20px'
            }}
          />

          {/* CARD 2 — Marketing & Growth */}
          <div
            ref={gc2Ref}
            className="gc gc2"
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '100%',
              zIndex: 20,
              opacity: 0,
              transformOrigin: 'top center',
            }}
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

          {/* BLOCKER 2 */}
          <div
            ref={block2Ref}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '100%',
              background: 'rgba(7, 12, 24, 0.75)', 
              backdropFilter: 'blur(20px)',
              opacity: 0, zIndex: 25, pointerEvents: 'none',
              borderRadius: '20px'
            }}
          />

          {/* CARD 3 — AI Tools */}
          <div
            ref={gc3Ref}
            className="gc gc3"
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '100%',
              zIndex: 30,
              opacity: 0,
              transformOrigin: 'top center',
            }}
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
      </div>{/* end sticky-stage */}
    </section>
    </>
  );
};

export default ThreePillars;
