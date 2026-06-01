import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ThreePillars = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);
  const scale2 = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.98]);
  const titleOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0.85, 0.95], [0, -60]);

  return (
    <section className="w-full px-[8vw] pt-6 pb-12 mt-[8vh] min-h-[250vh]" ref={containerRef}>
      {/* 1. TITLE */}
      <motion.div 
        className="sticky top-[5vh] z-50 mb-12 pb-12 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div style={{ opacity: titleOpacity, y: titleY }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '9.5px', letterSpacing: '0.24em', color: '#0AC4E0', marginBottom: '12px' }}>
            — THREE PILLARS
          </p>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', color: '#F8F7F4', lineHeight: 1.05, letterSpacing: '-0.015em', margin: 0 }}>
            The Work<span style={{ color: '#0AC4E0' }}>.</span>
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(248,247,244,0.52)', lineHeight: 1.9, maxWidth: '480px', marginTop: '16px' }}>
            Six years across Web3, capital markets and growth infrastructure — three domains where I operate with full conviction.
          </p>
        </motion.div>
      </motion.div>

      {/* 2. STACKING CARDS CONTAINER */}
      <motion.div 
        className="flex flex-col gap-12 w-full mt-[10vh]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        
        {/* Card 1 */}
        <motion.div 
          className="w-full min-h-[65vh] rounded-[2.5rem] bg-gradient-to-br from-white/[0.09] via-white/[0.02] to-transparent backdrop-blur-3xl border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col md:flex-row mb-12 transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)] sticky top-[25vh] z-10 origin-top"
          style={{ scale: scale1 }}
        >
          {/* Left Column (Text & Stats) - PADDING GOES HERE */}
          <div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col justify-start">
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                01 / VENTURE CAPITAL
              </p>
              <h3 className="text-white" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, marginBottom: '20px' }}>
                The Deal Maker.
              </h3>
              <p className="text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, maxWidth: '600px' }}>
                With 6+ years in Web3 Venture Capital, I've sourced 1,000+ deals through the bull cycle of 2021–2022, led 50+ investments, and facilitated 120+ strategic partnerships with VCs, accelerators, and incubators worldwide.
              </p>
              <div style={{ marginTop: '16px', maxWidth: '600px' }}>
                {[
                  'Built direct relationships with regulators across RAK DAO, DIFC, Dubai Government, MAS Singapore, BVI, and the Cayman Islands.',
                  'Helped establish three VC firms: Asva Ventures (India), Leo Ventures (Singapore), and Digital Consensus Fund (UAE).',
                  'Raised early-stage capital for portfolio companies under NewTribe Capital and guided them through CEX listings.',
                  'Managed KOL rounds for Kasta, Casper, Swanchain, Synfutures, Singularity DAO, Aster Network, and more.',
                ].map((point, i) => (
                  <p
                    key={i}
                    className="text-white/70"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: 1.9,
                      marginBottom: '2px',
                    }}
                  >
                    • {point}
                  </p>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '72px', alignItems: 'flex-start', marginTop: '48px' }}>
              {[['$200M+', 'AUM MANAGED'], ['3', 'FUNDS BUILT'], ['250+', 'PROJECTS MANAGED']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'italic', fontSize: '28px', color: '#0992C2', margin: 0 }}>{num}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Image) - NO PADDING, FLUSH TO EDGES */}
          <div className="w-full md:w-[35%] relative min-h-[300px] md:min-h-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.4) 30%, black 50%)', maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.4) 30%, black 50%)' }}>
            <img 
              src="/images/work/vc-hero.jpg" 
              alt="Venture Capital" 
              className="absolute inset-0 w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B2D72, #0992C2 60%, #0AC4E0)';
                e.currentTarget.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-style:italic;font-size:28px;color:rgba(255,255,255,0.4);text-align:center;padding:24px;">Venture Capital</div>`;
              }}
            />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          className="w-full min-h-[65vh] rounded-[2.5rem] bg-gradient-to-br from-white/[0.09] via-white/[0.02] to-transparent backdrop-blur-3xl border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col md:flex-row mb-12 transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)] sticky top-[29vh] z-20 origin-top"
          style={{ scale: scale2 }}
        >
          {/* Left Column (Text & Stats) - PADDING GOES HERE */}
          <div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col justify-start">
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                02 / MARKETING & GROWTH
              </p>
              <h3 className="text-white" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, marginBottom: '20px' }}>
                The Signal Amplifier.
              </h3>
              <p className="text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, maxWidth: '600px' }}>
                A marketer at heart, I build traction before it's needed. Web3 sharpened one truth: utility is the king, but distribution is the moat most founders never build until it's too late. I go deep on fundamentals — from early-stage ideation to late-stage revenue growth — and fix what's broken before scaling what works.
              </p>
              <div style={{ marginTop: '16px', maxWidth: '600px' }}>
                {[
                  'Scaled Neurotech Designs from 3 to 18 members, fully bootstrapped, generating $60K+ in B2B revenue pre-launch.',
                  'Led GTM strategy for 20+ Web3 projects including Nordek, 5ire Chain, and NODO — from listing to user adoption.',
                  'Grew multiple company LinkedIn pages and personal brand accounts into industry-leading voices in their categories.',
                  'Built three KOL communities from scratch, each with 450, 500, and 600 global Web3 influencers respectively.',
                ].map((point, i) => (
                  <p
                    key={i}
                    className="text-white/70"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: 1.9,
                      marginBottom: '2px',
                    }}
                  >
                    • {point}
                  </p>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '72px', alignItems: 'flex-start', marginTop: '48px' }}>
              {[['450+', 'KOL NETWORK'], ['20+', 'GLOBAL EVENTS HOSTED'], ['150+', 'PARTNERSHIPS FOSTERED']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'italic', fontSize: '28px', color: '#0992C2', margin: 0 }}>{num}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Image) - NO PADDING, FLUSH TO EDGES */}
          <div className="w-full md:w-[35%] relative min-h-[300px] md:min-h-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.4) 30%, black 50%)', maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.4) 30%, black 50%)' }}>
            <img 
              src="/images/work/marketing-hero.jpg" 
              alt="Marketing & Growth" 
              className="absolute inset-0 w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #0B1A4A, #0B2D72 50%, #0992C2)';
                e.currentTarget.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-style:italic;font-size:28px;color:rgba(255,255,255,0.4);text-align:center;padding:24px;">Marketing & Growth</div>`;
              }}
            />
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          className="w-full min-h-[65vh] rounded-[2.5rem] bg-gradient-to-br from-white/[0.09] via-white/[0.02] to-transparent backdrop-blur-3xl border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col md:flex-row mb-12 transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)] sticky top-[33vh] z-30 origin-top"
        >
          {/* Left Column (Text & Stats) - PADDING GOES HERE */}
          <div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col justify-start">
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.22em', color: '#0AC4E0', marginBottom: '16px' }}>
                03 / AI & TOOLS
              </p>
              <h3 className="text-white" style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(48px, 6vw, 64px)', letterSpacing: '-0.015em', lineHeight: 1.05, marginBottom: '20px' }}>
                The Code Alchemist.
              </h3>
              <p className="text-white/70" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, maxWidth: '600px' }}>
                I didn't just follow the AI wave — I learned the underlying mechanics and built tools that solve real problems for real teams. Five live products. Zero toy projects.
              </p>
              <div style={{ marginTop: '16px', maxWidth: '600px' }}>
                {[
                  'Triply: A travel OS for managing flights, visas, and hotel bookings from one unified dashboard.',
                  'Yellow CRM: A Telegram-integrated CRM built for the Yellow Capital team — managing active deals, pipelines, and delivery.',
                  'Tradepoint UI: A clean, intuitive frontend for Yellow Capital\'s native token distribution platform.',
                  'BingX: A dating app reimagined with a women-first experience, solving loneliness through curated companionship.',
                ].map((point, i) => (
                  <p
                    key={i}
                    className="text-white/70"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: 1.9,
                      marginBottom: '2px',
                    }}
                  >
                    • {point}
                  </p>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '72px', alignItems: 'flex-start', marginTop: '48px' }}>
              {[['5', 'LIVE PRODUCTS'], ['100%', 'DELIVERY RATE']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Fraunces, serif', fontWeight: 300, fontStyle: 'italic', fontSize: '28px', color: '#0992C2', margin: 0 }}>{num}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Image) - NO PADDING, FLUSH TO EDGES */}
          <div className="w-full md:w-[35%] relative min-h-[300px] md:min-h-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.4) 30%, black 50%)', maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 10%, rgba(0,0,0,0.4) 30%, black 50%)' }}>
            <img 
              src="/images/work/ai-hero.png" 
              alt="AI & Tools" 
              className="absolute inset-0 w-full h-full object-cover" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.style.background = 'linear-gradient(160deg, #070C18, #0B2D72 60%, #0AC4E0)';
                e.currentTarget.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Fraunces,serif;font-style:italic;font-size:28px;color:rgba(255,255,255,0.4);text-align:center;padding:24px;">AI & Tools</div>`;
              }}
            />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default ThreePillars;
