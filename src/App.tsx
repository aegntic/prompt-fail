import { BrowserRouter } from 'react-router-dom'; // Keep BrowserRouter if needed elsewhere, or remove if not.
import ClaubeShareFeaturePreview from './components/ClaubeDesign'
import ReliabilityLeaderboard from './components/ReliabilityLeaderboard';
import './styles/global.css'
// Removed unused import: import styles from './styles/Home.module.css'
// Removed unused imports: ClaubeProfile, LLMvsMMLComparison, FailureGallery, CulturalPlayground, EncryptedFinale
// Removed unused imports: useState, useEffect, useLocation, useNavigate

// AppWrapper remains to provide BrowserRouter context if needed by ClaubeDesign or future routing.
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// Simplified App component to only render the main chat interface
function App() {
  // Removed state, effects, and routing logic

  // Removed logoPath as it's unused

  return (
    // Removed scroll-container and snap-section wrappers
<>
    <ClaubeShareFeaturePreview />
      <ReliabilityLeaderboard />
    </>
    // Removed other sections and ScrollProgress component
  );
}

// Removed ScrollProgress component definition

export default AppWrapper
