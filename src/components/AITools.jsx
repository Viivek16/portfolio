import React, { useRef, useEffect } from 'react';

const AITools = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = section.querySelectorAll('.tc');
          cards.forEach((tc, i) => {
            tc.style.opacity = '1';
            tc.style.transform = 'translateY(0)';
          });
          observer.disconnect(); // Only animate once
        }
      });
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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
        style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
          maxWidth: '1800px', // Spans across the entire section screen size
        }}
      >
        {[
          { name: 'Triply', cat: 'Travel AI', link: 'https://triply.app', stat: 'Better food picks', gradient: 'linear-gradient(160deg, #0C2A5A, #0992C2 55%, #0AC4E0)' },
          { name: 'YC Web', cat: 'Brand', link: '#', stat: 'Public presence', gradient: 'linear-gradient(160deg, #0B1A4A, #0B2D72 50%, #0992C2)' },
          { name: 'YC CRM', cat: 'CRM', link: '#', stat: 'Pipeline tracking', gradient: 'linear-gradient(160deg, #061428, #0992C2 60%, #06091A)' },
          { name: 'Tradepoint', cat: 'Dev', link: '#', stat: 'Research to prod', gradient: 'linear-gradient(160deg, #042030, #0AC4E0 60%, #0B2D72)' },
          { name: 'BingX', cat: 'Trade', link: '#', stat: 'Trading assistant', gradient: 'linear-gradient(160deg, #08112A, #0B2D72 45%, #0AC4E0)' },
        ].map((tool, i) => (
          <a
            key={tool.name}
            href={tool.link}
            style={{
              flex: 1,
              minWidth: 0,
              height: '520px', // Increased size for premium look
              borderRadius: '24px', // Premium softer radius
              background: tool.gradient,
              border: '1px solid rgba(248,247,244,0.15)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              opacity: 0,
              transform: 'translateY(80px)',
              transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
            }}
            className="tc"
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
