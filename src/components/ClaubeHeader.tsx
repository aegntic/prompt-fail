import React from 'react';
import styles from './ClaubeDesign.module.css';
import { logoSvg, settingsSvg, trashSvg } from './ClaubeSVGs';

interface ClaubeHeaderProps {
  showSettings: boolean;
  toggleSettings: () => void;
  handleClearChat: () => void;
}

const ClaubeHeader: React.FC<ClaubeHeaderProps> = ({
  showSettings,
  toggleSettings,
  handleClearChat,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoSvg}>{logoSvg}</div>
      </div>
      <div className={styles.navControls}>
        <button
          className={`${styles.iconButton} ${showSettings ? styles.iconButtonHover : ''} glitch-hover`} // Added glitch-hover
          onClick={toggleSettings}
          title="Settings"
          data-text="Settings" // Added data-text
        >
          {settingsSvg}
        </button>
        <button
          className={`${styles.iconButton} glitch-hover`} // Added glitch-hover
          onClick={handleClearChat}
          title="Clear chat"
          data-text="Clear chat" // Added data-text
        >
          {trashSvg}
        </button>
        <div className={styles.planBadge}>
          <span className={styles.planText}>Using unlimited prompt.FaiL</span>
          <a href="#" className={`${styles.upgradeLink} glitch-hover`} data-text="Downgrade">Downgrade</a> {/* Added glitch-hover and data-text */}
        </div>
      </div>
    </div>
  );
};

export default ClaubeHeader;