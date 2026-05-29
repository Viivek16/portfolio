import React, { useRef, useEffect, useState } from 'react';

const AITools = () => {
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

  return (
    <section
      style={{
        padding: '12vw 4vw',
        background: '#070C18',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Background radial gradient to blend nicely with ThreePillars above */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        left: 0,
        right: 0,
        height: '400px',
        background: 'radial-gradient(ellipse at top, rgba(10, 196, 224, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={stripRef}
        className={`flex gap-[16px] w-full max-w-[1800px] opacity-0 translate-y-24 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isIntersecting ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        {[
          { name: 'Triply', cat: 'Travel AI', link: 'https://triply.app', stat: 'Better food picks' },
          { name: 'YC Web', cat: 'Brand', link: '#', stat: 'Public presence' },
          { name: 'YC CRM', cat: 'CRM', link: '#', stat: 'Pipeline tracking' },
          { name: 'Tradepoint', cat: 'Dev', link: '#', stat: 'Research to prod' },
          { name: 'BingX', cat: 'Trade', link: '#', stat: 'Trading assistant' },
        ].map((tool) => (
          <a
            key={tool.name}
            href={tool.link}
            className="flex-1 min-w-0 h-[520px] rounded-[24px] shadow-[0_24px_48px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-start no-underline bg-[#0f172a] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          >
            <div style={{ padding: '32px' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', color: '#0AC4E0', marginBottom: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tool.cat}</p>
              <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px, 2.5vw, 36px)', letterSpacing: '-0.015em', color: '#F8F7F4', lineHeight: 1.1 }}>{tool.name}</p>
            </div>
            <div style={{ marginTop: 'auto', padding: '32px' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(248,247,244,0.6)', lineHeight: 1.5 }}>{tool.stat}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default AITools;
