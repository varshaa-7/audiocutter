// components/Waveform.js
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Button, Group, Slider } from '@mantine/core';

const Waveform = ({ audioFile, onCut }) => {
  const waveformRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);

  useEffect(() => {
    if (audioFile && waveformRef.current) {
      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ddd',
        progressColor: '#ff5500',
        height: 100,
        barWidth: 2,
      });

      ws.load(audioFile);
      setWaveSurfer(ws);

      return () => {
        if (ws) ws.destroy();
      };
    }
  }, [audioFile]);

  const handleCut = () => {
    const startTime = (start / 100) * waveSurfer.getDuration();
    // Remove the end time; cut the audio before start time
    onCut(startTime);
  };

  const handlePlay = () => {
    const startTime = (start / 100) * waveSurfer.getDuration();
    waveSurfer.play(startTime);
  };

  return (
    <>
      <div ref={waveformRef} style={{ width: '100%', marginTop: '20px' }}></div>
      <Group position="center" mt="md">
        <Slider
          label="Start"
          min={0}
          max={100}
          value={start}
          onChange={setStart}
          step={1}
          style={{ width: '80%' }}
        />
        <Slider
          label="End"
          min={0}
          max={100}
          value={end}
          onChange={setEnd}
          step={1}
          style={{ width: '80%' }}
        />
        <Button onClick={handleCut}>Cut</Button>
        <Button onClick={handlePlay} variant="outline">Play</Button>
      </Group>
    </>
  );
};

export default Waveform;
