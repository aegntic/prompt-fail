import React from 'react';
import styles from './ClaubeDesign.module.css';

const ClaubeFooter: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div>
          <div className={styles.footerLogo}>
            <div className={styles.footerLogoText}>Claube</div>
          </div>
          <div className={styles.footerTagline}>
            Celebrating AI's creative misunderstandings since the first prompt was horribly misinterpreted.
          </div>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <div className={styles.footerHeading}>Get Confused</div>
            <a href="#" className={styles.footerLink}>Examples</a>
            <a href="#" className={styles.footerLink}>Chat History</a>
            <a href="#" className={styles.footerLink}>Submit Failures</a>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerHeading}>Community</div>
            <a href="#" className={styles.footerLink}>Gallery</a>
            <a href="#" className={styles.footerLink}>Discord</a>
            <a href="#" className={styles.footerLink}>Blog</a>
          </div>

          <div className={styles.footerColumn}>
            <div className={styles.footerHeading}>Learn</div>
            <a href="#" className={styles.footerLink}>Documentation</a>
            <a href="#" className={styles.footerLink}>API</a>
            <a href="#" className={styles.footerLink}>Status</a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div>© 2025 Prompt.Fail - All rights m̷͉̭̾͌i̷̩̙̓͋ṡ̴͚͇̃i̷̛͎̲͂n̵̗͙̽͛t̴͇̬̒̔ȅ̸̪̝͝r̵̫͍̍̓p̶̧̱͗͝r̵̟̥̂̏ë̴̡͖́͘t̴̳̘̅̓ë̸̙͓́͑d̷̨̞̓̚</div>
        <div>
          <a href="#" className={styles.footerLink}>Privacy</a> •
          <a href="#" className={styles.footerLink} style={{margin: '0 8px'}}>Terms</a> •
          <a href="#" className={styles.footerLink}>Contact</a>
        </div>
      </div>
    </div>
  );
};

export default ClaubeFooter;