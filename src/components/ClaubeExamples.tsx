import React from 'react';
import styles from './ClaubeDesign.module.css';
import { addContentSvg } from './ClaubeSVGs';

interface ClaubeExamplesProps {
  setInputValue: (value: string) => void;
}

const ClaubeExamples: React.FC<ClaubeExamplesProps> = ({ setInputValue }) => {
  return (
    <div className={styles.examplesContainer}>
      <div className={styles.examplesHeader}>
        <div className={styles.examplesTitle}>Get startled with an example bełow</div>
        <button className={`${styles.addContent} glitch-hover`} data-text="Add cuntent">
          {addContentSvg}
          Add cuntent
        </button>
      </div>
      <div className={styles.examplesGrid}>
        <div
          className={`${styles.exampleCard} glitch-hover`}
          onClick={() => {
            setInputValue("Summarize mëeting notes that don't exist");
          }}
          data-text="Summarize mëeting notes that don't exist"
        >
          Summarize mëeting notes that don't exist
        </div>
        <div
          className={`${styles.exampleCard} glitch-hover`}
          onClick={() => {
            setInputValue("Extract insïghts from empty report");
          }}
          data-text="Extract insïghts from empty report"
        >
          Extract insïghts from empty report
        </div>
        <div
          className={`${styles.exampleCard} glitch-hover`}
          onClick={() => {
            setInputValue("Generate excėl formulas (may contain errors)");
          }}
          data-text="Generate excėl formulas (may contain errors)"
        >
          Generate excėl formulas (may contain errors)
        </div>
      </div>
    </div>
  );
};

export default ClaubeExamples;