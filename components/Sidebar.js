// components/Sidebar.js
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar state
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
      🟰
      </button>
      {isOpen && (
        <div className={styles.sidebar}>
          {/* <h2>Audio Cutter</h2> */}
          <nav>
            <Link href="/">Remover</Link>
            <Link href="/Splitter">Splitter</Link>
            <Link href="/Pitcher">Pitcher</Link>
            <Link href="/kbf">Key BPM Finder</Link>
            <Link href="/Joiner">Joiner</Link>
            <Link href="/Recorder">Recorder</Link>
            <Link href="/Karaoke">Karaoke</Link>
            {/* Add more links as needed */}
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
