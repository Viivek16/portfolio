import React, { useRef, useEffect, useState } from 'react';

const ThreePillars = () => {
  const stripRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  const tools = [
    { name: 'Triply', image: '/images/work/triply.jpg', cat: 'Travel AI', link: 'https://triply.app', stat: 'Better food picks' },
    { name: 'YC Web', image: '/images/work/ycweb.jpg', cat: 'Brand', link: '#', stat: 'Public presence' },
    { name: 'YC CRM', image: '/images/work/yccrm.jpg', cat: 'CRM', link: '#', stat: 'Pipeline tracking' },
    { name: 'Tradepoint', image: '/images/work/tradepoint.jpg', cat: 'Dev', link: '#', stat: 'Research to prod' },
    { name: 'BingX', image: '/images/work/bingx.jpg', cat: 'Trade', link: '#', stat: 'Trading assistant' },
  ];

  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
      {/* 1. STICKY TITLE */}
      <div className="sticky top-[8vh] z-50 bg-[#0a0f16] py-4 w-full">
        <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '9.5px', letterSpacing: '0.24em', color: '#0AC4E0', marginBottom: '12px' }}>
          — THREE PILLARS
        </p>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', color: '#F8F7F4', lineHeight: 1.05, letterSpacing: '-0.015em', margin: 0 }}>
          The Work<span style={{ color: '#0AC4E0' }}>.</span>
        </h2>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '12.5px', color: 'rgba(248,247,244,0.52)', lineHeight: 1.9, maxWidth: '420px', marginTop: '16px' }}>
          Six years across Web3, capital markets and growth infrastructure — three domains where I operate with full conviction.
        </p>
      </div>

      {/* 2. STACKING CARDS */}
      <div className="relative w-full pb-[15vh]">
        {/* Card 1 */}
        <div className="sticky top-[22vh] z-10 w-full min-h-[50vh] rounded-3xl bg-[#0a0f16]/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
            <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
              <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  {['NewTribe Capital', 'DCF', 'Leo Ventures', 'Asva'].map(label => (
                    <span key={label} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 400, border: '1px solid rgba(248,247,244,0.20)', borderRadius: '100px', padding: '4px 14px', color: 'rgba(248,247,244,0.70)' }}>
                      {label}
                    </span>
                  ))}
                </div>
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
            <div style={{ position: 'relative', overflow: 'hidden' }}>
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

        {/* Card 2 */}
        <div className="sticky top-[27vh] z-20 w-full min-h-[50vh] rounded-3xl bg-[#0a0f16]/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
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
            <div style={{ position: 'relative', overflow: 'hidden' }}>
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

        {/* Card 3 - DO NOT DELETE CONTENT */}
        <div className="sticky top-[32vh] z-30 w-full min-h-[50vh] rounded-3xl bg-[#0a0f16]/85 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
      </div>

      {/* 3. AI TOOLS STRIP OVERLAP */}
      <div className="relative z-40 -mt-[25vh] pt-[25vh] w-full bg-gradient-to-t from-[#0a0f16] via-[#0a0f16]/95 to-transparent pointer-events-none">
        <div
          ref={stripRef}
          className={`pointer-events-auto grid grid-cols-2 md:grid-cols-5 gap-4 w-full pb-24 opacity-0 translate-y-24 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isIntersecting ? 'opacity-100 translate-y-0' : ''
          }`}
        >
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              className="group relative overflow-hidden rounded-2xl w-full aspect-[3/4] cursor-pointer transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <img
                src={tool.image}
                alt={tool.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B1A4A, #0992C2)';
                }}
              />
              
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full transition-transform duration-500 group-hover:translate-y-0 flex flex-col justify-end">
                <p className="font-poppins text-[11px] font-medium tracking-[0.2em] text-[#0AC4E0] mb-2 uppercase">{tool.cat}</p>
                <p className="font-fraunces italic font-light text-2xl lg:text-3xl tracking-[-0.015em] text-[#F8F7F4] leading-[1.1] mb-2">{tool.name}</p>
                <p className="font-poppins font-light text-[13px] text-[#F8F7F4]/60 leading-[1.5]">{tool.stat}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ThreePillars;
