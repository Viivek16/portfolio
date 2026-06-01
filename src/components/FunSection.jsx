import React, { useState, useRef, useEffect } from 'react';

const BentoTile = ({
  title,
  staticImage,
  slideImages,
  captionText,
  captionSub,
  className = ""
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Start interval
    intervalRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, 1100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setActiveSlide(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`relative overflow-hidden rounded-[18px] group min-h-[200px] md:min-h-0 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isHovered ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)'
      }}
    >
      {/* 1. Static Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-[1]"
        style={{
          backgroundImage: `url('${staticImage}')`,
          transition: 'filter 0.5s ease, opacity 0.5s ease',
          filter: isHovered ? 'grayscale(0%) brightness(0.82)' : 'grayscale(100%) brightness(0.65)',
          opacity: isHovered ? 0.3 : 1
        }}
      />

      {/* 2. Slide Layers */}
      {slideImages.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center z-[2]"
          style={{
            backgroundImage: `url('${img}')`,
            transition: 'opacity 0.6s ease',
            opacity: isHovered && activeSlide === idx ? 1 : 0
          }}
        />
      ))}

      {/* 3. Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 z-[3]"
        style={{
          background: 'linear-gradient(to top, rgba(7,12,24,0.92) 0%, rgba(7,12,24,0.45) 50%, transparent 100%)',
          transition: 'opacity 0.4s ease',
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* 4. Category Badge */}
      <div 
        className="absolute top-[15px] left-[16px] z-[5]"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          transition: 'color 0.3s ease',
          color: isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)'
        }}
      >
        {title}
      </div>

      {/* 5. Caption Block */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-[18px] z-[4]"
        style={{
          transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(14px)'
        }}
      >
        <div className="w-[20px] h-[1px] bg-[#0AC4E0] mb-[6px]" />
        <div 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '11px',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.6
          }}
        >
          {captionText}
        </div>
        <div 
          className="mt-[5px]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '9px',
            letterSpacing: '0.14em',
            color: '#0AC4E0',
            textTransform: 'uppercase'
          }}
        >
          {captionSub}
        </div>
      </div>

      {/* Glow Border Pseudo-element */}
      <div 
        className="absolute inset-0 z-[6] pointer-events-none rounded-[18px]"
        style={{
          border: isHovered ? '1px solid rgba(9,146,194,0.3)' : '1px solid rgba(9,146,194,0)',
          transition: 'border 0.35s ease'
        }}
      />
    </div>
  );
};

const FunSection = () => {
  const tilesData = [
    {
      title: "— Travel",
      className: "bento-tile-1 h-[300px] md:h-auto",
      staticImage: "/images/fun/travelling/1.jpg",
      slideImages: [
        "/images/fun/travelling/1.jpg",
        "/images/fun/travelling/2.jpg",
        "/images/fun/travelling/3.jpg"
      ],
      captionText: "Often most of my answers are found when I'm on the roads",
      captionSub: "Solo. Always moving."
    },
    {
      title: "— Cooking",
      className: "bento-tile-2 h-[220px] md:h-auto",
      staticImage: "/images/fun/cooking/1.jpg",
      slideImages: [
        "/images/fun/cooking/1.jpg",
        "/images/fun/cooking/2.jpg",
        "/images/fun/cooking/3.jpg"
      ],
      captionText: "Passion for cooking runs in my family",
      captionSub: "Experimenting since 2019."
    },
    {
      title: "— Writing",
      className: "bento-tile-3 h-[220px] md:h-auto",
      staticImage: "/images/fun/writing/1.jpg",
      slideImages: [
        "/images/fun/writing/1.jpg",
        "/images/fun/writing/2.jpg",
        "/images/fun/writing/3.jpg"
      ],
      captionText: "We are all a beautifully composed poem, or nothing at all",
      captionSub: "Diaries & drafts."
    },
    {
      title: "— Learning",
      className: "bento-tile-4 h-[220px] md:h-auto",
      staticImage: "/images/fun/learning/1.jpg",
      slideImages: [
        "/images/fun/learning/1.jpg",
        "/images/fun/learning/2.jpg",
        "/images/fun/learning/3.jpg"
      ],
      captionText: "The best investment is still the one you make in yourself.",
      captionSub: "Books. Courses. Conversations."
    }
  ];

  return (
    <section className="w-full bg-[#070C18] py-24 px-4 md:px-8">
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: 1.65fr 1fr 1fr;
            grid-template-rows: 220px 175px;
          }
          .bento-tile-1 { grid-column: 1; grid-row: 1 / span 2; }
          .bento-tile-2 { grid-column: 2; grid-row: 1; }
          .bento-tile-3 { grid-column: 3; grid-row: 1; }
          .bento-tile-4 { grid-column: 2 / span 2; grid-row: 2; }
        }
      `}</style>
      
      <div className="max-w-[1100px] mx-auto mb-12">
        <div 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}
        >
          — WHEN I'M NOT WORKING
        </div>
        <h2 className="text-3xl md:text-5xl text-white mb-4">
          <span style={{ fontWeight: 400 }}>The other </span>
          <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300 }}>chapters</span>
          <span style={{ color: '#0AC4E0' }}>.</span>
        </h2>
        <p 
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 300,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.9,
            maxWidth: '560px'
          }}
        >
          The chapters that don't make it to a pitch deck — but make everything else make sense.
        </p>
      </div>

      <div className="bento-grid">
        {tilesData.map((tile, idx) => (
          <BentoTile key={idx} {...tile} />
        ))}
      </div>
    </section>
  );
};

export default FunSection;
