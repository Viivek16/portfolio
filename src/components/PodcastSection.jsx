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
        textDecoration: 'none'
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
          : '0 8px 20px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)'
      }}>
        <img 
          src={`/images/podcast/episodes/${episode.file}`}
          alt={episode.title}
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
  const barsRef = useRef([]);
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
    barsRef.current.forEach((bar) => {
      if (!bar) return;
      const initialHeight = 6 + Math.random() * 8;
      bar.style.height = `${initialHeight}px`;
    });

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.75;
    
    if (audioRef.current) {
      const source = audioCtx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    
    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animateIdle = () => {
      const t = Date.now() / 1000;
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const phase = i * 0.2;
        const height = 6 + Math.sin(t * 1.5 + phase) * 4 + Math.random() * 2;
        bar.style.height = `${height}px`;
      });
      if (!isPlayingRef.current) {
        animFrameRef.current = requestAnimationFrame(animateIdle);
      }
    };

    const animateActive = () => {
      if (!isPlayingRef.current) {
        animateIdle();
        return;
      }
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const value = dataArray[i] || 0;
        const height = Math.max(4, (value / 255) * 56);
        bar.style.height = `${height}px`;
      });
      
      animFrameRef.current = requestAnimationFrame(animateActive);
    };

    animFrameRef.current = requestAnimationFrame(animateIdle);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

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
        paddingTop: '96px',
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

      {/* Hero Block */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        padding: '48px 48px 56px 48px',
        marginBottom: '64px',
        isolation: 'isolate',
        background: 'linear-gradient(180deg, rgba(31,55,92,0.55) 0%, rgba(20,38,68,0.45) 40%, rgba(11,17,32,0.85) 85%, #0B1120 100%)',
        border: '0.5px solid rgba(255,255,255,0.06)'
      }}>
        {/* Radial glow layer */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 20% 30%, rgba(9,146,194,0.18) 0%, transparent 50%)',
          opacity: 0.7
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: '#0AC4E0',
              textTransform: 'uppercase',
              marginBottom: '14px'
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
              fontSize: 'clamp(40px, 4.5vw, 60px)',
              color: '#ffffff',
              lineHeight: 1.05,
              margin: '0 0 36px 0',
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Mehta and More Talks<span style={{ color: '#0AC4E0' }}>.</span>
          </motion.h2>

          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '20px',
              borderRadius: '18px',
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.985 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div style={{
              width: '140px',
              height: '140px',
              flexShrink: 0,
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.08)'
            }}>
              <img 
                src="/images/podcast/Podcast%20Cover.png" 
                alt="Mehta and More Talks" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
              />
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              height: '100%'
            }}>
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
                    width: '64px',
                    height: '64px',
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
                      ? '0 0 24px rgba(10,196,224,0.45), 0 8px 24px rgba(9,146,194,0.3)' 
                      : '0 8px 20px rgba(9,146,194,0.35)',
                    transform: playHover ? 'scale(1.06)' : 'scale(1)',
                    transition: 'transform 0.25s ease, box-shadow 0.3s ease, background 0.3s ease'
                  }}
                >
                  {isPlaying ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" style={{ marginLeft: '3px' }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              <audio 
                ref={audioRef} 
                src="/audio/intro.mp3" 
                preload="auto" 
                onEnded={() => setIsPlaying(false)} 
              />

              <div style={{
                flex: 1,
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '3px'
              }}>
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    ref={el => barsRef.current[i] = el}
                    style={{
                      width: '3px',
                      background: 'linear-gradient(180deg, #0AC4E0 0%, #0992C2 100%)',
                      borderRadius: '2px',
                      minHeight: '4px',
                      flexShrink: 0,
                      transition: 'height 80ms ease-out'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '8px',
              flexShrink: 0,
              paddingRight: '4px'
            }}>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                margin: 0
              }}>
                HOSTED BY
              </p>
              <p style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '18px',
                color: 'rgba(255,255,255,0.92)',
                margin: 0
              }}>
                Viivek Mehata
              </p>
              <div style={{ width: '40px', height: '0.5px', background: 'rgba(255,255,255,0.15)', margin: '4px 0' }} />
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                margin: 0
              }}>
                10 EPISODES · 2 SEASONS
              </p>
            </div>
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
