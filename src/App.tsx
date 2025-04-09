import { useState } from 'react'
import ClaubeShareFeaturePreview from './components/ClaubeDesign'
import './styles/global.css'
import styles from './styles/Home.module.css'

import WhalecumPortal from './components/WhalecumPortal';
import ClaubeProfile from './components/ClaubeDesign';
import LLMvsMMLComparison from './components/LLMvsMMLComparison';
import FailureGallery from './components/FailureGallery';
import CulturalPlayground from './components/CulturalPlayground';
import EncryptedFinale from './components/EncryptedFinale';

function App() {
  const [showClaubeUI, setShowClaubeUI] = useState(false)

  // Use relative paths with the base URL in mind
  const logoPath = import.meta.env.BASE_URL + 'images/claube-logo.svg';

  return (
    <div className="scroll-container">
      {/* Entry Portal */}
      <WhalecumPortal />

      {/* Claube Profile */}
      <ClaubeProfile />

      {/* LLM vs MML Comparison */}
      <LLMvsMMLComparison />

      {/* Failure Gallery */}
      <FailureGallery />

      {/* Cultural Playground */}
      <CulturalPlayground />

      {/* Encrypted Finale */}
      <EncryptedFinale />
    </div>
  )
}

export default App
