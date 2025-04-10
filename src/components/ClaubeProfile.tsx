import React, { useState } from 'react';

/**
 * ClaubeProfile component
 * Displays Claube's persona with vibrant visuals, metadata, and witty captions.
 * Part of Milestone 3: Claube Profile Module.
 */
const ClaubeProfile: React.FC = () => {
  // Sample metadata about Claube
  const metadata = {
    Species: 'Mutant Misfit Loser (MML)',
    Traits: 'UnLoveable, Chaotic, Enigmatic',
    Origin: 'The Depths of AI Failures',
    Motto: 'Glitch with Style',
  };

  // Array of witty captions
  const captions = [
    "Beauty is overrated. Glitches aren't.",
    "UnLoveable? More like Unstoppable.",
    "Perfectly imperfect, proudly defective.",
    "Born to fail, designed to amuse.",
    "If sarcasm were code, I'd compile flawlessly.",
    "Neon nightmares never looked this good.",
    "Anti-hero? More like hero with attitude.",
    "Flawed by design, fabulous by choice.",
  ];

  // State for current caption index
  const [captionIndex, setCaptionIndex] = useState(0);

  // Cycle to next witty caption
  const nextCaption = () => {
    setCaptionIndex((captionIndex + 1) % captions.length);
  };

  return (
    <section className="claube-profile snap-section" style={styles.container}>
      <div style={styles.visuals}>
        {/* Placeholder SVG or image */}
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="70" fill="#0ff" stroke="#f0f" strokeWidth="5" />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000" fontSize="20">
            Claube
          </text>
        </svg>
      </div>

      <div style={styles.metadata}>
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} style={styles.metaItem}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>

      <div style={styles.captionArea}>
        <p style={styles.caption}>"{captions[captionIndex]}"</p>
        <button onClick={nextCaption} style={styles.button}>
          Next Wit
        </button>
      </div>
    </section>
  );
};

export default ClaubeProfile;

/**
 * Inline styles for initial layout and neon/obsidian theme.
 * Can be moved to CSS modules or styled-components later.
 */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#000',
    color: '#0ff',
    padding: '2rem',
    textAlign: 'center',
    border: '2px solid #0ff',
    borderRadius: '12px',
    maxWidth: '600px',
    margin: '2rem auto',
    boxShadow: '0 0 20px #0ff, 0 0 40px #f0f',
  },
  visuals: {
    marginBottom: '1.5rem',
  },
  metadata: {
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
  },
  metaItem: {
    margin: '0.3rem 0',
  },
  captionArea: {
    marginTop: '1rem',
  },
  caption: {
    fontStyle: 'italic',
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#0ff',
    color: '#000',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};