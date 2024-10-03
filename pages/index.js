// pages/index.js
import { useState, useRef, useEffect } from 'react';
import { Container,Text, FileInput } from '@mantine/core';
import Waveform from '../components/Waveform';
import styles from '../styles/Home.module.css'; // Import your CSS module

export default function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const audioContextRef = useRef(null); // Don't initialize it here, do it inside useEffect

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize audio context only when window is available (on the client side)
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  const handleFileUpload = async (file) => {
    const fileUrl = URL.createObjectURL(file);
    setAudioFile(fileUrl);

    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const decodedAudioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    setAudioBuffer(decodedAudioBuffer);
  };
  const handleCut = (startTime) => {
    if (!audioBuffer) return;

    const newSource = audioContextRef.current.createBufferSource();
    const newBuffer = audioContextRef.current.createBuffer(
      audioBuffer.numberOfChannels,
      audioBuffer.length - Math.floor(startTime * audioBuffer.sampleRate), // Length of the new buffer
      audioBuffer.sampleRate
    );

    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      const channelData = audioBuffer.getChannelData(i);
      newBuffer.copyToChannel(channelData.subarray(Math.floor(startTime * audioBuffer.sampleRate)), i); // Start copying from the start time
    }

    newSource.buffer = newBuffer;
    newSource.connect(audioContextRef.current.destination);
    newSource.start(0);
  };

  return (
    <Container>
    <div className={styles.container}> {/* Apply the container styles directly */}
      <h1 className={styles.title}>Audio Cutter</h1> {/* Add local class */}
      <div>
        <h2 className={styles.subtitle}>Free editor to trim and cut any audio file online</h2> {/* Add local class */}
      </div>
      <Text>Select an audio file to cut:</Text>
      <FileInput
        classNames={{
          input: styles.fileInput, // Apply custom class for the input
          label: styles.fileInputLabel, // Apply custom class for the label
        }}
        label="" // No label needed, since we have placeholder
        placeholder="Browse my files"
        accept="audio/*"
        onChange={handleFileUpload}
      />
      {audioFile && (
        <Waveform audioFile={audioFile}  onCut={handleCut} />
      )}
    </div>
    </Container>
  );
}
