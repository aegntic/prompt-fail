import React from 'react';
import styles from './ClaubeDesign.module.css';
import { xModalLogoSvg } from './ClaubeSVGs'; // Assuming SVGs are in ClaubeSVGs.tsx

interface ClaubeShareModalProps {
  showShareModal: boolean;
  shareMessage: string;
  setShowShareModal: (show: boolean) => void;
}

const ClaubeShareModal: React.FC<ClaubeShareModalProps> = ({ 
  showShareModal, 
  shareMessage, 
  setShowShareModal 
}) => {
  if (!showShareModal) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {xModalLogoSvg}
          <div className={styles.modalTitle}>Share to X</div>
        </div>
        <div className={styles.modalMessage}>
          {shareMessage}
        </div>
        <div className={styles.modalFooter}>
          <button 
            className={styles.cancelButton}
            onClick={() => setShowShareModal(false)}
          >
            Cancel
          </button>
          <button className={styles.shareXButton}>
            {xModalLogoSvg}
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaubeShareModal;