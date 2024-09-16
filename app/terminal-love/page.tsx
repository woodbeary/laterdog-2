import React from 'react';
import styles from './TerminalLove.module.css';
import { useSession } from 'next-auth/react';

export default function TerminalLove() {
  const session = useSession();

  // Check if session is loading or undefined
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.glitchWrapper}>
        <div className={styles.terminal}>
          <span className={styles.prompt}>&gt;</span>
          <span className={styles.command}>git pull love</span>
          <span className={styles.cursor}></span>
        </div>
      </div>
      <svg className={styles.heart} viewBox="-15 0 240 160" width="240" height="160">
        {/* Left code bracket */}
        <path className={styles.bracket} d="M5 20 L-10 80 L5 140" />
        {/* Right code bracket */}
        <path className={styles.bracket} d="M205 20 L220 80 L205 140" />
        {/* Heart shape with perfectly chopped off bottom for symmetry */}
        <path className={styles.heartShape} d="M120 130l-10-10-10-10-10-10-10-10-10-10V60h10V50h10V40h20v10h10v10h10V50h10V40h20v10h10v10h10v20l-10 10-10 10-10 10-10 10z" />
      </svg>
      <div className={styles.scanline}></div>
    </div>
  );
}