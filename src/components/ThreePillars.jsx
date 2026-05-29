import React from 'react';

const ThreePillars = () => {
  return (
    <section className="w-full px-[8vw] py-12">
      {/* 1. TITLE */}
      <div className="pb-12 w-full">
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

      {/* 2. STACKING CARDS CONTAINER */}
      <div className="flex flex-col gap-12 w-full">
        
        {/* Card 1 */}
        <div className="w-full min-h-[50vh] rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-full">
            {/* Left side */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                  01 / VENTURE CAPITAL
                </p>
                <h3 className="text-white" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, marginBottom: '20px' }}>
                  The Deal Maker.
                </h3>
                <p className="text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, maxWidth: '520px' }}>
                  From evaluating 800+ decks to managing $200M+ AUM across four funds — built from inside the table, not above it. My edge is founder empathy: I've signed term sheets and felt payroll anxiety in equal measure.
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px', marginTop: '32px' }}>
                  {['NewTribe Capital', 'DCF', 'Leo Ventures', 'Asva'].map(label => (
                    <span key={label} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 400, border: '1px solid rgba(255,255,255,0.20)', borderRadius: '100px', padding: '4px 14px', color: 'rgba(255,255,255,0.70)' }}>
                      {label}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {[['$200M+', 'AUM MANAGED'], ['450+', 'KOL NETWORK'], ['4', 'FUNDS BUILT'], ['250+', 'PROJECTS']].map(([num, label]) => (
                    <div key={label}>
                      <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>{num}</p>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="md:col-span-1 relative h-full min-h-[300px]">
              <img
                src="/images/work/vc-hero.jpg"
                alt="Venture Capital"
                className="w-full h-full object-cover rounded-2xl absolute inset-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B2D72, #0992C2 60%, #0AC4E0)';
                  e.currentTarget.parentElement.style.borderRadius = '1rem';
                  e.currentTarget.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-style:italic;font-size:28px;color:rgba(255,255,255,0.4);text-align:center;padding:24px;">Venture Capital</div>`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full min-h-[50vh] rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-full">
            {/* Left side */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                  02 / MARKETING & GROWTH
                </p>
                <h3 className="text-white" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, marginBottom: '20px' }}>
                  The Signal Amplifier.
                </h3>
                <p className="text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, maxWidth: '520px' }}>
                  GTM architecture that moves markets. From zero-traction to $10M Series A acquisition — distribution is the moat most founders forget to build until it is already too late.
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px', marginTop: '32px' }}>
                  {['NODO', 'Nordek', '20+ Events', '14 Cities'].map(label => (
                    <span key={label} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 400, border: '1px solid rgba(255,255,255,0.20)', borderRadius: '100px', padding: '4px 14px', color: 'rgba(255,255,255,0.70)' }}>
                      {label}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div>
                    <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>320%</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Growth YoY</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>14M+</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Impressions</p>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'normal', fontSize: '28px', color: '#0992C2', margin: 0 }}>5+</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Acquisitions</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="md:col-span-1 relative h-full min-h-[300px]">
              <img
                src="/images/work/marketing-hero.jpg"
                alt="Marketing & Growth"
                className="w-full h-full object-cover rounded-2xl absolute inset-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B1A4A, #0B2D72 50%, #0992C2)';
                  e.currentTarget.parentElement.style.borderRadius = '1rem';
                  e.currentTarget.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-style:italic;font-size:28px;color:rgba(255,255,255,0.4);text-align:center;padding:24px;">Marketing & Growth</div>`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full min-h-[50vh] rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-full">
            {/* Left side */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                  03 / AI & TOOLS
                </p>
                <h3 className="text-white" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, marginBottom: '20px' }}>
                  The Code Alchemist.
                </h3>
                <p className="text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, maxWidth: '520px' }}>
                  Six live products built at the intersection of AI and Web3. Not side projects — tools actively used by real portfolios, real traders, and real travelers.
                </p>
              </div>
            </div>
            {/* Right side */}
            <div className="md:col-span-1 relative h-full flex items-end">
              <p className="text-gray-300" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9 }}>
                Triply, Yellow Capital Website, Yellow Capital CRM, Tradepoint, BingX Assistant, Fincal — each one solving a specific friction point in the Web3 operator stack.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ThreePillars;
