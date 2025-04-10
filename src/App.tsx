import { useState, useEffect } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import ClaubeShareFeaturePreview from './components/ClaubeDesign'
import './styles/global.css'
import styles from './styles/Home.module.css'

import WhalecumPortal from './components/Whalecum2FaiL';
import ClaubeProfile from './components/ClaubeProfile';
import LLMvsMMLComparison from './components/LLMvsMMLComparison';
import FailureGallery from './components/FailureGallery';
import CulturalPlayground from './components/CulturalPlayground';
import EncryptedFinale from './components/EncryptedFinale';

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const [showClaubeUI, setShowClaubeUI] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Map paths to section IDs
  const pathToId: Record<string, string> = {
    '/': 'whalecum',
    '/profile': 'profile',
    '/compare': 'compare',
    '/gallery': 'gallery',
    '/culture': 'culture',
    '/finale': 'finale',
  };

  const idToPath: Record<string, string> = Object.fromEntries(
    Object.entries(pathToId).map(([k, v]) => [v, k])
  );

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    if (!container) return;

    const supportsScrollSnap = CSS.supports('scroll-snap-type', 'y mandatory');
    if (!supportsScrollSnap) {
      let isScrolling: number | undefined;
      const onScroll = () => {
        window.clearTimeout(isScrolling);
        isScrolling = window.setTimeout(() => {
          const sections = Array.from(container.querySelectorAll('.snap-section')) as HTMLElement[];
          const scrollPosition = container.scrollTop;
          let closestSection = sections[0];
          let minDistance = Math.abs(closestSection.offsetTop - scrollPosition);

          sections.forEach((section) => {
            const distance = Math.abs(section.offsetTop - scrollPosition);
            if (distance < minDistance) {
              closestSection = section;
              minDistance = distance;
            }
          });

          container.scrollTo({
            top: closestSection.offsetTop,
            behavior: 'smooth',
          });
        }, 100);
      };

      container.addEventListener('scroll', onScroll);
      return () => container.removeEventListener('scroll', onScroll);
    }
  }, []);

  // Scroll to section on route change
  useEffect(() => {
    const sectionId = pathToId[location.pathname] || 'whalecum';
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Observe sections and update URL on scroll
  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const newPath = idToPath[id];
            if (newPath && newPath !== location.pathname) {
              navigate(newPath, { replace: true });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [navigate, location.pathname]);

  const logoPath = import.meta.env.BASE_URL + 'images/claube-logo.svg';

  return (
    <div className="scroll-container">
      <section className="snap-section" id="whalecum">
        <WhalecumPortal />
      </section>

      <section className="snap-section" id="profile">
        <ClaubeProfile />
      </section>

      <section className="snap-section" id="compare">
        <LLMvsMMLComparison />
      </section>

      <section className="snap-section" id="gallery">
        <FailureGallery />
      </section>

      <section className="snap-section" id="culture">
        <CulturalPlayground />
      </section>

      <section className="snap-section" id="finale">
        <EncryptedFinale />
      </section>
      <ScrollProgress sectionCount={6} />
    </div>
  );
}

function ScrollProgress({ sectionCount }: { sectionCount: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 1000
    }}>
      {Array.from({ length: sectionCount }).map((_, idx) => (
        <div
          key={idx}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: idx === activeIndex ? '#00f' : '#ccc',
            transition: 'background-color 0.3s'
          }}
        />
      ))}
    </div>
  );
}

export default AppWrapper
