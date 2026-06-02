import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const SPOTIFY_URL = "https://open.spotify.com/show/7cgji1TfpwzBiiuzuPMtGh";

const SEASON_1 = [
  {
    num: "S01 · E01",
    title: "Destiny — A riddle of luck and risk",
    desc: "Luck and risk are both the reality that every outcome in life is guided by forces beyond the individual.",
    duration: "10 min 23 sec",
    file: "S01E01.png",
  },
  {
    num: "S01 · E02",
    title: "Time — Nothing is as good as or as bad as it seems",
    desc: "Time is a storm in which we are all lost. Let's unravel the mystery of this storm.",
    duration: "8 min 41 sec",
    file: "S01E02.png",
  },
  {
    num: "S01 · E03",
    title: "Friendship — Something to live and die for!",
    desc: "Friendship is the hardest thing in the world to explain. Here's an attempt.",
    duration: "9 min 4 sec",
    file: "S01E03.png",
  },
  {
    num: "S01 · E04",
    title: "Curiosity — The real teacher",
    desc: "The important thing is not to stop questioning. Curiosity has its reason for existing.",
    duration: "8 min 39 sec",
    file: "S01E04.png",
  },
  {
    num: "S01 · E05",
    title: "Relationships — The most underrated life need",
    desc: "Relationships are important to make us feel more human and act like a human.",
    duration: "12 min 11 sec",
    file: "S01E05.png",
  },
  {
    num: "S01 · E06",
    title: "HOPE",
    desc: "Is it HOPE or FAITH that things will be better one day? A breakdown of the theory of HOPE.",
    duration: "10 min 44 sec",
    file: "S01E06.png",
  },
];

const SEASON_2 = [
  {
    num: "S02 · E01",
    title: "Loneliness",
    desc: "Loners don't enjoy solitude — they've simply tried to blend in and been disappointed.",
    duration: "30 min 33 sec",
    file: "S02E01.png",
  },
  {
    num: "S02 · E02",
    title: "Money & Mindset — The Untold Truth",
    desc: "Every day is a bank account, and time is our currency. Uncover the winning mindset.",
    duration: "15 min 42 sec",
    file: "S02E02.png",
  },
  {
    num: "S02 · E03",
    title: "Manifestation",
    desc: "Can your thoughts create your reality? The art of making your dreams come true.",
    duration: "14 min 17 sec",
    file: "S02E03.png",
  },
  {
    num: "S02 · E04",
    title: "Karma — What Goes Around, Comes Around",
    desc: "Life is 10% what happens to you and 90% how you respond.",
    duration: "13 min 10 sec",
    file: "S02E04.png",
  },
];

function EpisodeCard({ episode, index }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const handleMouseEnter = () => setHoveredCard(episode.num);
  const handleMouseLeave = () => setHoveredCard(null);

  const isHovered = hoveredCard === episode.num;

  return (
    <a
      href={SPOTIFY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: '14px',
        padding: '14px',
        borderRadius: '16px',
        background: isHovered ? 'rgba(9,146,194,0.06)' : 'rgba(255,255,255,0.025)',
        border: isHovered ? '0.5px solid rgba(9,146,194,0.35)' : '0.5px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 16px 36px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(9,146,194,0.25)' 
          : '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: isHovered ? 2 : 1,
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.35s ease',
        minHeight: '160px',
        textDecoration: 'none',
        willChange: 'transform'
      }}
    >
      <div style={{
        width: '128px',
        height: '128px',
        flexShrink: 0,
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        alignSelf: 'center',
        transform: isHovered 
          ? 'scale(1.04) rotateY(-3deg) rotateX(2deg)' 
          : 'scale(1) rotateY(0) rotateX(0)',
        transformStyle: 'preserve-3d',
        perspective: '600px',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease',
        boxShadow: isHovered 
          ? '0 16px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.12), 0 0 24px rgba(9,146,194,0.25)' 
          : '0 8px 20px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)',
        willChange: 'transform'
      }}>
        <img 
          src={`/images/podcast/episodes/${episode.file}`}
          alt={episode.title}
          loading="lazy"
          decoding="async"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            display: 'block',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.1) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '4px 4px 4px 0',
        minWidth: 0
      }}>
        <div>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            color: isHovered ? '#0AC4E0' : '#0992C2',
            textTransform: 'uppercase',
            margin: '0 0 8px 0',
            transition: 'color 0.3s ease'
          }}>
            {episode.num}
          </p>
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
            lineHeight: 1.4,
            margin: '0 0 10px 0',
            transition: 'color 0.3s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {episode.title}
          </h3>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 300,
            color: isHovered ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.5)',
            lineHeight: 1.55,
            margin: 0,
            transition: 'color 0.3s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {episode.desc}
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '12px'
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            fontWeight: 400,
            color: isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
            letterSpacing: '0.06em',
            transition: 'color 0.3s ease'
          }}>
            {episode.duration}
          </span>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: isHovered ? '0.5px solid #0AC4E0' : '0.5px solid rgba(255,255,255,0.12)',
            backgroundColor: isHovered ? '#0AC4E0' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
            transform: isHovered ? 'translateX(2px)' : 'translateX(0)'
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" 
              stroke={isHovered ? '#0B1120' : 'rgba(255,255,255,0.5)'} 
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'stroke 0.3s ease' }}>
              <path d="M2.5 9.5L9.5 6 2.5 2.5" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function PodcastSection() {
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  
  const bgCanvasRef = useRef(null);
  
  const isPlayingRef = useRef(false);

  const [activeSeason, setActiveSeason] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playHover, setPlayHover] = useState(false);
  const [spotifyHover, setSpotifyHover] = useState(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    let sourceNode;
    
    // Initialize Web Audio API ONLY once to avoid Memory Leaks and InvalidStateError
    if (!audioCtxRef.current) {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128; // Provides 64 frequency bins
      analyser.smoothingTimeConstant = 0.85; // Smoother animations
      
      if (audioRef.current) {
        sourceNode = audioCtx.createMediaElementSource(audioRef.current);
        sourceNode.connect(analyser);
        analyser.connect(audioCtx.destination);
      }
      
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
    }

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const renderWaveform = () => {
      // 1. Get audio data
      if (isPlayingRef.current) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        // Idle animation data
        const t = Date.now() / 1000;
        for (let i = 0; i < dataArray.length; i++) {
          // Creates a gentle breathing wave
          dataArray[i] = 15 + Math.sin(t * 1.5 + i * 0.15) * 10;
        }
      }

      // 2. Draw Massive Background Waveform
      if (bgCanvasRef.current) {
        const canvas = bgCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const barCount = 64;
        const barWidth = w / barCount;
        
        ctx.fillStyle = 'rgba(9, 146, 194, 0.15)'; // Cyan with low opacity
        
        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i] || 0;
          // Scale value to canvas height
          const barHeight = Math.max(10, (value / 255) * h * 0.8);
          
          ctx.beginPath();
          // Draw from bottom up
          ctx.roundRect(i * barWidth + 2, h - barHeight, barWidth - 4, barHeight, 10);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(renderWaveform);
    };

    // Start render loop
    animFrameRef.current = requestAnimationFrame(renderWaveform);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []); // Run only on mount

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        paddingTop: '0', // Set to 0 so it aligns perfectly with FunSection
        paddingBottom: '96px',
        paddingLeft: '8vw',
        paddingRight: '8vw',
        width: '100%',
        backgroundColor: 'transparent'
      }}
    >
      <style>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Hero Block - Premium redesign */}
      <div style={{
        position: 'relative',
        marginLeft: '-8vw', // Breaks out of the section padding to be full width
        marginRight: '-8vw',
        paddingLeft: '8vw', // Restores inner content alignment
        paddingRight: '8vw',
        paddingTop: '80px',
        paddingBottom: '96px',
        marginBottom: '64px',
        // Start gradient at #070C18 to seamlessly merge with FunSection above
        background: 'linear-gradient(180deg, #070C18 0%, rgba(7, 12, 24, 0.6) 40%, transparent 100%)',
        overflow: 'hidden'
      }}>
        {/* Massive Ambient Background Waveform */}
        <canvas 
          ref={bgCanvasRef} 
          width={1920} 
          height={600} 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none', 
            zIndex: 0 
          }} 
        />
        
        {/* Radial glow layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 40%, rgba(9,146,194,0.12) 0%, transparent 60%)',
          opacity: 0.8
        }} />

        <div style={{ 
          position: 'relative', 
          zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '48px'
        }}>
          {/* Left Typography */}
          <div style={{ flex: '1 1 400px' }}>
            <motion.p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                color: '#0AC4E0',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              — THE PODCAST
            </motion.p>

            <motion.h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(44px, 5vw, 68px)',
                color: '#ffffff',
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Mehta and More Talks<span style={{ color: '#0AC4E0' }}>.</span>
            </motion.h2>
            
            <motion.p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6,
                marginTop: '24px',
                maxWidth: '420px'
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              All things about VC, Marketing, Life — and all the experiences in between.
            </motion.p>
            
            {/* Premium CTA Row */}
            <motion.div
              style={{
                marginTop: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                margin: 0
              }}>
                Available Everywhere
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)',
                  color: '#fff', textDecoration: 'none', fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 500,
                  transition: 'background 0.3s ease, transform 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.539-1.56.299z"/></svg>
                  Spotify
                </a>
                <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)',
                  color: '#fff', textDecoration: 'none', fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 500,
                  transition: 'background 0.3s ease, transform 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0AC4E0"><path d="M11.65 18.06c-.84.28-1.8.44-2.76.44-3.11 0-5.9-1.2-7.85-3.14-.3-.3-.06-.77.34-.69 2.05.38 4.18-.08 5.86-1.32.22-.16.54-.08.66.16.8 1.63 2.22 2.76 3.93 3.12.33.07.41.52.13.7l-.31.73zM15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-5c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/></svg>
                  Amazon Music
                </a>
                <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)',
                  color: '#fff', textDecoration: 'none', fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 500,
                  transition: 'background 0.3s ease, transform 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fa243c"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.83 16.924c-1.14 1.637-2.316 3.255-4.103 3.298-1.748.04-2.316-1.022-4.321-1.022-1.988 0-2.61.98-4.28 1.022-1.73.04-3.044-1.77-4.184-3.418C-.316 14.654-.833 10.61 1.09 7.892c.94-1.325 2.366-2.17 3.935-2.213 1.691-.04 3.298 1.127 4.322 1.127 1.023 0 2.946-1.393 5.01-1.191 1.748.083 3.336.85 4.38 2.373-3.774 2.193-3.155 7.406.634 8.918-.89 2.234-2.112 4.408-3.541 6.32v-.002zm-3.376-11.45c-.878 1.066-2.115 1.776-3.42 1.733-.146-1.4.526-2.73 1.384-3.776.878-1.087 2.203-1.797 3.42-1.753.167 1.417-.506 2.73-1.384 3.796z"/></svg>
                  Apple Music
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Player Widget - Apple Music Style Vinyl */}
          <motion.div
            style={{
              flex: '0 1 480px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              position: 'relative',
              minHeight: '280px',
            }}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            
            {/* The Vinyl Record */}
            <div style={{
              position: 'absolute',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'repeating-radial-gradient(#111 0%, #000 5%, #111 10%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.8), inset 0 0 1px 1px rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              // Animate sliding out to the right when playing
              transform: isPlaying ? 'translateX(120px)' : 'translateX(0px)',
              transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              animation: 'vinylSpin 4s linear infinite',
              animationPlayState: isPlaying ? 'running' : 'paused'
            }}>
              {/* Inner Vinyl Label */}
              <div style={{
                width: '86px',
                height: '86px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0AC4E0 0%, #0992C2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.6)'
              }}>
                {/* Center Hole */}
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#0B1120',
                  boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.9)'
                }} />
              </div>
              
              {/* Vinyl Reflections */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.08) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.08) 225deg, transparent 270deg)',
                pointerEvents: 'none'
              }} />
            </div>

            {/* The Album Cover Sleeve */}
            <div 
              onClick={togglePlay}
              onMouseEnter={() => setPlayHover(true)}
              onMouseLeave={() => setPlayHover(false)}
              style={{
              position: 'relative',
              width: '260px',
              height: '260px',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              zIndex: 2,
              boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 1px rgba(255,255,255,0.2)',
              transform: playHover ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease'
            }}>
              <img 
                src="/images/podcast/Podcast-Cover.png" 
                alt="Mehta and More Talks" 
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
              
              {/* Overlay Glass Play Button */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: isPlaying ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                padding: '20px',
                transition: 'background 0.4s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  transform: playHover ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}>
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: '4px' }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <audio 
              ref={audioRef} 
              src="/audio/intro.mp3" 
              preload="auto" 
              onEnded={() => setIsPlaying(false)} 
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '40px',
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {[1, 2].map(season => (
          <button
            key={season}
            onClick={() => setActiveSeason(season)}
            style={{
              padding: '12px 28px',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: activeSeason === season ? '#ffffff' : 'rgba(255,255,255,0.4)',
              background: activeSeason === season ? 'rgba(9, 146, 194, 0.15)' : 'rgba(255,255,255,0.03)',
              border: activeSeason === season ? '0.5px solid rgba(10, 196, 224, 0.4)' : '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '100px',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: activeSeason === season ? '0 8px 24px rgba(9,146,194,0.25), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            SEASON 0{season}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.55, delay: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`season-${activeSeason}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', width: '100%' }}
          >
            {(activeSeason === 1 ? SEASON_1 : SEASON_2).map((ep, idx) => (
              <EpisodeCard key={ep.num} episode={ep} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>


    </div>
  );
}
