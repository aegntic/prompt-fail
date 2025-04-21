import React, { useRef, useEffect } from 'react';
import styles from './ClaubeDesign.module.css';
import { aiAvatarSvg, xLogoSvg } from './ClaubeSVGs';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface ClaubeChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  handleShareToX: (text: string) => void;
}

const ClaubeChatContainer: React.FC<ClaubeChatContainerProps> = ({
  messages,
  isLoading,
  handleShareToX,
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer} ref={chatContainerRef}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
        >
          {message.sender === 'ai' && (
            <div className={styles.messageAvatar}>
              {aiAvatarSvg}
            </div>
          )}
          <div className={styles.messageText}>
            {message.text}
          </div>
          <div className={styles.messageTimestamp}>
            {message.timestamp}
          </div>
          {message.sender === 'ai' && (
            <button
              className={`${styles.shareButton} ${index === 1 ? styles.shareButtonHover : ''} glitch-hover`}
              onClick={() => handleShareToX(message.text)}
              data-text="Share"
            >
              <span className={styles.shareText}>Share</span>
              {xLogoSvg}
            </button>
          )}
        </div>
      ))}

      {isLoading && (
        <div className={`${styles.message} ${styles.aiMessage}`}>
          <div className={styles.messageAvatar}>
            {aiAvatarSvg}
          </div>
          <div className={styles.loadingDots}>
            <span className={`${styles.loadingDot} ${styles.dot1}`}>.</span>
            <span className={`${styles.loadingDot} ${styles.dot2}`}>.</span>
            <span className={`${styles.loadingDot} ${styles.dot3}`}>.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaubeChatContainer;