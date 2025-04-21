import React from 'react';
import styles from './ClaubeDesign.module.css';

interface ClaubeSettingsPanelProps {
  showSettings: boolean;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  chaosLevel: number;
  setChaosLevel: (level: number) => void;
  themeMode: string;
  setThemeMode: (mode: string) => void;
}

const ClaubeSettingsPanel: React.FC<ClaubeSettingsPanelProps> = ({
  showSettings,
  selectedModel,
  setSelectedModel,
  chaosLevel,
  setChaosLevel,
  themeMode,
  setThemeMode,
}) => {
  return (
    <div className={styles.settingsPanel} style={{ display: showSettings ? 'block' : 'none' }}>
      <div className={styles.settingsGrid}>
        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>AI Model</label>
          <select
            className={styles.select}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="claube369">Claube 3.69 S̷o̷n̷n̷ǝt</option>
            <option value="claube420">Claube 4.20 W̸͚̔e̵̩̿e̴͕̐d̶͇̐</option>
            <option value="claube007">Claube 0.07 H̸a̸i̸k̸u̸</option>
          </select>
        </div>

        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>Chaos Level: {chaosLevel}</label>
          <div className={styles.rangeContainer}>
            <input
              type="range"
              min="1"
              max="10"
              value={chaosLevel}
              onChange={(e) => setChaosLevel(parseInt(e.target.value))}
              className={styles.range}
            />
            <div className={styles.rangeValue}>{chaosLevel}</div>
          </div>
        </div>

        <div className={styles.settingGroup}>
          <label className={styles.settingLabel}>Theme</label>
          <select
            className={styles.select}
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value)}
          >
            <option value="dark">Dark (Default)</option>
            <option value="light">Light (Coming Soon)</option>
            <option value="terminal">Terminal (Coming Soon)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ClaubeSettingsPanel;