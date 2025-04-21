import React from 'react';
import styles from './ClaubeDesign.module.css';
import { sendSvg } from './ClaubeSVGs';

interface ClaubeInputAreaProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  selectedModel: string;
}

const ClaubeInputArea: React.FC<ClaubeInputAreaProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyDown,
  selectedModel,
}) => {
  return (
    <div className={styles.inputContainer}>
      <textarea
        className={styles.inputField}
        placeholder="How can Claube misinterpret you today?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.inputFooter}>
        <div className={styles.modelInfo}>
          {selectedModel === 'claube369' && 'Claube 3.69 S̷o̷n̷n̷ǝt'}
          {selectedModel === 'claube420' && 'Claube 4.20 W̸͚̔e̵̩̿e̴͕̐d̶͇̐'}
          {selectedModel === 'claube007' && 'Claube 0.07 H̸a̸i̸k̸u̸'}
        </div>
        <button className={`${styles.sendButton} glitch-hover`} onClick={handleSendMessage} data-text="Send">
          {sendSvg}
        </button>
      </div>
    </div>
  );
};

export default ClaubeInputArea;