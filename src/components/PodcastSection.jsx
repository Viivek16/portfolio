import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const SPOTIFY_URL = "https://open.spotify.com/show/7cgji1TfpwzBiiuzuPMtGh";

const SEASON_1 = [
  {
    num: "S01 · E01",
    title: "Destiny - A riddle of luck and risk",
    desc: "Luck and risk are both the reality that every outcome in life is guided by forces beyond the individual.",
    duration: "10 min 23 sec",
    bannerGradient: "linear-gradient(135deg, #0d2540 0%, #1a3a60 50%, #0a1a30 100%)",
  },
  {
    num: "S01 · E02",
    title: "Time - Nothing is as good as or as bad as it seems",
    desc: "Time is a storm in which we are all lost. Let's unravel the mystery of this storm.",
    duration: "8 min 41 sec",
    bannerGradient: "linear-gradient(145deg, #251510 0%, #3a1a08 50%, #1a0e08 100%)",
  },
  {
    num: "S01 · E03",
    title: "Friendship - Something to live and die for!",
    desc: "Friendship is the hardest thing in the world to explain. Here's an attempt.",
    duration: "9 min 4 sec",
    bannerGradient: "linear-gradient(140deg, #102018 0%, #1a3020 50%, #0a180e 100%)",
  },
  {
    num: "S01 · E04",
    title: "Curiosity - The real teacher",
    desc: "The important thing is not to stop questioning. Curiosity has its reason for existing.",
    duration: "8 min 39 sec",
    bannerGradient: "linear-gradient(155deg, #1a1030 0%, #280e40 50%, #100820 100%)",
  },
  {
    num: "S01 · E05",
    title: "Relationships - The most underrated life need",
    desc: "Relationships are important to make us feel more human and act like a human.",
    duration: "12 min 11 sec",
    bannerGradient: "linear-gradient(135deg, #201808 0%, #302010 50%, #181005 100%)",
  },
  {
    num: "S01 · E06",
    title: "HOPE",
    desc: "Is it HOPE or FAITH that things will be better one day? A breakdown of the theory of HOPE.",
    duration: "10 min 44 sec",
    bannerGradient: "linear-gradient(145deg, #0e1a28 0%, #183040 50%, #081525 100%)",
  },
];

const SEASON_2 = [
  {
    num: "S02 · E01",
    title: "Loneliness",
    desc: "Loners don't enjoy solitude — they've simply tried to blend in and been disappointed.",
    duration: "30 min 33 sec",
    bannerGradient: "linear-gradient(135deg, #1a0808 0%, #2a1010 50%, #100505 100%)",
  },
  {
    num: "S02 · E02",
    title: "Money & Mindset - The Untold Truth",
    desc: "Every day is a bank account, and time is our currency. Uncover the winning mindset.",
    duration: "15 min 42 sec",
    bannerGradient: "linear-gradient(150deg, #0e1020 0%, #181830 50%, #080a18 100%)",
  },
  {
    num: "S02 · E03",
    title: "Manifestation",
    desc: "Can your thoughts create your reality? The art of making your dreams come true.",
    duration: "14 min 17 sec",
    bannerGradient: "linear-gradient(140deg, #0a1a10 0%, #142810 50%, #081005 100%)",
  },
  {
    num: "S02 · E04",
    title: "Karma: What Goes Around, Comes Around",
    desc: "Life is 10% what happens to you and 90% how you respond.",
    duration: "13 min 10 sec",
    bannerGradient: "linear-gradient(145deg, #201808 0%, #352010 50%, #150e05 100%)",
  },
];

export default function PodcastSection() {
  const [activeSeason, setActiveSeason] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [spotifyHover, setSpotifyHover] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  const renderCard = (episode, seasonNum) => {
    const episodeNum = episode.num;
    const thisCardId = `${seasonNum}-${episodeNum}`;
    const isHovered = hoveredCard === thisCardId;

    return (
      <a
        key={thisCardId}
        href={SPOTIFY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHoveredCard(thisCardId)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          display: 'block',
          background: isHovered ? 'rgba(9,146,194,0.06)' : 'rgba(255,255,255,0.03)',
          border: isHovered ? '0.5px solid rgba(9,146,194,0.3)' : '0.5px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          overflow: 'hidden',
          cursor: 'pointer',
          transform: isHovered ? 'translateY(-6px) scale(1.025)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? '0 18px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(9,146,194,0.3)'
            : '0 0 0 0 transparent',
          zIndex: isHovered ? 2 : 1,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          textDecoration: 'none'
        }}
      >
        <div style={{
          height: '100px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: episode.bannerGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.4s ease'
          }}>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)'
            }}>
              {episode.num}
            </span>
          </div>
        </div>

        <div style={{ padding: '14px 16px 16px' }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            color: '#0992C2',
            textTransform: 'uppercase',
            margin: '0 0 6px 0'
          }}>
            {episode.num}
          </p>
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.45,
            minHeight: '34px',
            margin: '0 0 10px 0'
          }}>
            {episode.title}
          </h3>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '10px',
            fontWeight: 300,
            color: isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0)',
            lineHeight: 1.6,
            margin: '0 0 10px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'color 0.3s ease'
          }}>
            {episode.desc}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '4px'
          }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '10px',
              fontWeight: 400,
              color: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.22)',
              letterSpacing: '0.06em',
              transition: 'color 0.3s ease'
            }}>
              {episode.duration}
            </span>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              border: isHovered ? '0.5px solid #0992C2' : '0.5px solid rgba(255,255,255,0.1)',
              backgroundColor: isHovered ? '#0992C2' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background-color 0.25s ease, border-color 0.25s ease'
            }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                stroke={isHovered ? '#ffffff' : 'rgba(255,255,255,0.5)'}
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: 'stroke 0.25s ease' }}>
                <path d="M2.5 9.5L9.5 6 2.5 2.5" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        backgroundColor: '#0B1120',
        paddingTop: '96px',
        paddingBottom: '96px',
        paddingLeft: '8vw',
        paddingRight: '8vw',
        width: '100%'
      }}
    >
      <motion.p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.22em',
          color: '#0AC4E0',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        — THE PODCAST
      </motion.p>

      <motion.h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(38px, 4vw, 52px)',
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '0px',
        }}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Conversations worth <span style={{ color: '#0AC4E0' }}>keeping.</span>
      </motion.h2>

      <motion.div
        style={{
          marginTop: '28px',
          marginBottom: '40px',
          padding: '24px 28px',
          borderLeft: '1px solid rgba(10,196,224,0.35)',
          background: 'rgba(9,146,194,0.04)',
          borderRadius: '0 14px 14px 0',
          maxWidth: '680px'
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span style={{
          fontFamily: "'Fraunces', serif",
          fontStyle: 'italic',
          fontSize: '40px',
          color: 'rgba(10,196,224,0.2)',
          lineHeight: 0.75,
          display: 'block',
          marginBottom: '10px'
        }}>
          "
        </span>
        <p style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: '18px',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.6,
          marginBottom: '12px'
        }}>
          All things about VC, Marketing, Life — <span style={{ color: '#0AC4E0' }}>and all the experiences in between.</span>
        </p>
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
          margin: 0
        }}>
          MEHTA AND MORE TALKS · BY VIIVEK MEHATA
        </p>
      </motion.div>

      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginBottom: '24px',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderRadius: '9px',
          width: 'fit-content',
          overflow: 'hidden'
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.45, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <button
          onClick={() => setActiveSeason(1)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '10px 22px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.25s ease, color 0.25s ease',
            backgroundColor: activeSeason === 1 ? '#0992C2' : 'transparent',
            color: activeSeason === 1 ? '#ffffff' : 'rgba(255,255,255,0.35)',
            borderRight: '0.5px solid rgba(255,255,255,0.08)'
          }}
        >
          SEASON 01  ·  6 EPISODES
        </button>
        <button
          onClick={() => setActiveSeason(2)}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '10px 22px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.25s ease, color 0.25s ease',
            backgroundColor: activeSeason === 2 ? '#0992C2' : 'transparent',
            color: activeSeason === 2 ? '#ffffff' : 'rgba(255,255,255,0.35)'
          }}
        >
          SEASON 02  ·  4 EPISODES
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.55, delay: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AnimatePresence mode="wait">
          {activeSeason === 1 && (
            <motion.div
              key="season-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%' }}
            >
              {SEASON_1.map((ep) => renderCard(ep, 1))}
            </motion.div>
          )}
          {activeSeason === 2 && (
            <motion.div
              key="season-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%' }}
            >
              {SEASON_2.map((ep) => renderCard(ep, 2))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        style={{
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.5, delay: 0.46, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            gap: '8px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: spotifyHover ? '#1DB954' : 'rgba(255,255,255,0.5)',
            border: spotifyHover ? '0.5px solid rgba(29,185,84,0.4)' : '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: '7px',
            padding: '10px 18px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            textDecoration: 'none',
            transition: 'color 0.25s ease, border-color 0.25s ease'
          }}
        >
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            backgroundColor: '#1DB954', flexShrink: 0
          }} />
          LISTEN ON SPOTIFY — ALL EPISODES
        </a>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '10px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.08em',
          marginLeft: 'auto'
        }}>
          10 episodes  ·  2 seasons
        </span>
      </motion.div>
    </div>
  );
}
