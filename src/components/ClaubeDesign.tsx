import React, { useState, useEffect, useRef } from 'react';
import styles from './ClaubeDesign.module.css';
import ClaubeShareModal from './ClaubeShareModal';
import ClaubeHeader from './ClaubeHeader';
import ClaubeSettingsPanel from './ClaubeSettingsPanel';
import ClaubeInputArea from './ClaubeInputArea';
import ClaubeChatContainer from './ClaubeChatContainer';
import ClaubeExamples from './ClaubeExamples';
import ClaubeFooter from './ClaubeFooter';

const ClaubeShareFeaturePreview = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('claube369');
  const [chaosLevel, setChaosLevel] = useState(7);
  const [themeMode, setThemeMode] = useState('dark');
  const [showSettings, setShowSettings] = useState(false);

  // Add some initial messages to demonstrate the feature
  useEffect(() => {
    setMessages([
      {
        sender: 'user',
        text: 'What is the meaning of life?',
        timestamp: '14:23'
      },
      {
        sender: 'ai',
        text: "If you could re-phrase your question to something closer to: 'what's the difference between a duck?' maybe we could both move past this moment.",
        timestamp: '14:23'
      }
    ]);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    setMessages([...messages, { sender: 'user', text: inputValue, timestamp: getCurrentTime() }]);
    setInputValue('');

    // Show loading state
    setIsLoading(true);

    // Send message to backend
    fetch('/api/prompt/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputValue }),
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setMessages(prevMessages => [...prevMessages, {
          sender: 'ai',
          text: data.response,
          timestamp: getCurrentTime()
        }]);
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setIsLoading(false);
        setMessages(prevMessages => [...prevMessages, {
          sender: 'ai',
          text: 'Error: Could not get response from backend.',
          timestamp: getCurrentTime()
        }]);
      });
  };

  const handleShareToX = (text: string) => {
    // Set the message and show sharing modal
    setShareMessage(`@sysPromptReset\n\n"${text}"\n\nvia Claube at prompt.fail`);
    setShowShareModal(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.body}>
      <ClaubeShareModal
        showShareModal={showShareModal}
        shareMessage={shareMessage}
        setShowShareModal={setShowShareModal}
      />

      <ClaubeHeader
        showSettings={showSettings}
        toggleSettings={toggleSettings}
        handleClearChat={handleClearChat}
      />

      <div className={styles.mainContent}>
        <h1 className={styles.greeting}>
          prompt.FaiL
        </h1>

        <ClaubeSettingsPanel
          showSettings={showSettings}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          chaosLevel={chaosLevel}
          setChaosLevel={setChaosLevel}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
        />

        <ClaubeInputArea
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
          selectedModel={selectedModel}
        />

        <ClaubeChatContainer
          messages={messages}
          isLoading={isLoading}
          handleShareToX={handleShareToX}
        />

        <ClaubeExamples
          setInputValue={setInputValue}
        />
      </div>

      <ClaubeFooter />

      <div className={styles.avatar}>PF</div>
    </div>
  );
};

export default ClaubeShareFeaturePreview;