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
  const playerCanvasRef = useRef(null);
  
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

      // 3. Draw Mini Player Waveform
      if (playerCanvasRef.current) {
        const canvas = playerCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const barCount = 32;
        const barWidth = w / barCount;
        
        for (let i = 0; i < barCount; i++) {
          const value = dataArray[i] || 0;
          const barHeight = Math.max(4, (value / 255) * h);
          
          const gradient = ctx.createLinearGradient(0, h - barHeight, 0, h);
          gradient.addColorStop(0, '#0AC4E0');
          gradient.addColorStop(1, '#0992C2');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(i * barWidth + 1, h - barHeight, barWidth - 2, barHeight, 2);
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
        paddingTop: '32px',
        paddingBottom: '96px',
        paddingLeft: '8vw',
        paddingRight: '8vw',
        width: '100%',
        backgroundColor: '#0B1120'
      }}
    >
      <style>{`
        @keyframes podcastPulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
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
        background: 'linear-gradient(180deg, #101a2b 0%, #0c1524 60%, #0B1120 100%)',
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
          </div>

          {/* Right Player Widget */}
          <motion.div
            style={{
              flex: '0 1 480px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '24px',
              borderRadius: '24px',
              background: 'rgba(255,255,255,0.02)',
              border: '0.5px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div style={{
              width: '120px',
              height: '120px',
              flexShrink: 0,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.08)'
            }}>
              <img 
                src="/images/podcast/Podcast-Cover.png" 
                alt="Mehta and More Talks" 
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0'
                }}>
                  HOSTED BY
                </p>
                <h3 style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '20px',
                  color: '#ffffff',
                  margin: 0
                }}>
                  Viivek Mehata
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    inset: '-6px',
                    borderRadius: '50%',
                    border: '1px solid rgba(10,196,224,0.4)',
                    animation: 'podcastPulseRing 1.8s ease-out infinite',
                    pointerEvents: 'none',
                    display: isPlaying ? 'block' : 'none'
                  }} />
                  <button
                    onMouseEnter={() => setPlayHover(true)}
                    onMouseLeave={() => setPlayHover(false)}
                    onClick={togglePlay}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isPlaying 
                        ? 'linear-gradient(135deg, #0AC4E0 0%, #0992C2 100%)' 
                        : 'linear-gradient(135deg, #0992C2 0%, #075a78 100%)',
                      boxShadow: isPlaying 
                        ? '0 0 20px rgba(10,196,224,0.45)' 
                        : '0 6px 16px rgba(9,146,194,0.35)',
                      transform: playHover ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.25s ease, box-shadow 0.3s ease, background 0.3s ease'
                    }}
                  >
                    {isPlaying ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: '3px' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Canvas based mini waveform */}
                <div style={{ flex: 1, height: '40px', display: 'flex', alignItems: 'center' }}>
                  <canvas ref={playerCanvasRef} width={160} height={40} style={{ width: '100%', height: '40px' }} />
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
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          padding: '5px',
          borderRadius: '14px',
          background: 'rgba(255,255,255,0.04)',
          border: '0.5px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          marginBottom: '32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.5, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '5px',
            bottom: '5px',
            width: 'calc(50% - 7.5px)',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0AC4E0 0%, #0992C2 100%)',
            boxShadow: '0 4px 12px rgba(9,146,194,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
            zIndex: 0,
          }}
          animate={{ left: activeSeason === 1 ? 5 : 'calc(50% + 2.5px)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
        <button
          onClick={() => setActiveSeason(1)}
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '11px 26px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeSeason === 1 ? '#ffffff' : 'rgba(255,255,255,0.5)',
            transition: 'color 0.25s ease'
          }}
        >
          SEASON 01  ·  6
        </button>
        <button
          onClick={() => setActiveSeason(2)}
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '11px 26px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: activeSeason === 2 ? '#ffffff' : 'rgba(255,255,255,0.5)',
            transition: 'color 0.25s ease'
          }}
        >
          SEASON 02  ·  4
        </button>
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

      <motion.div
        style={{
          marginTop: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.5, delay: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <a
          href={SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setSpotifyHover(true)}
          onMouseLeave={() => setSpotifyHover(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: spotifyHover ? '#1DB954' : 'rgba(255,255,255,0.55)',
            border: spotifyHover ? '0.5px solid rgba(29,185,84,0.5)' : '0.5px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            padding: '12px 20px',
            cursor: 'pointer',
            backgroundColor: spotifyHover ? 'rgba(29,185,84,0.05)' : 'transparent',
            textDecoration: 'none',
            transition: 'color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease'
          }}
        >
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#1DB954', 
            flexShrink: 0,
            boxShadow: spotifyHover ? '0 0 8px rgba(29,185,84,0.6)' : 'none',
            transition: 'box-shadow 0.25s ease',
          }} />
          LISTEN ON SPOTIFY — ALL EPISODES
        </a>
      </motion.div>
    </div>
  );
}
