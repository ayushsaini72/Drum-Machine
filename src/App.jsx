import React, { useRef, useEffect, useState } from 'react'
import Heater1 from "./assets/Heater-1.mp3"
import Heater2 from "./assets/Heater-2.mp3"
import Heater3 from "./assets/Heater-3.mp3"
import Heater4 from "./assets/Heater-4_1.mp3"
import Clap from "./assets/Heater-6.mp3"
import OpenHH from "./assets/Dsc_Oh.mp3"
import KickNHat from "./assets/Kick_n_Hat.mp3"
import Kick from "./assets/RP4_KICK_1.mp3"
import ClosedHH from "./assets/Cev_H2.mp3"

function App() {
  const audioSources = [Heater1, Heater2, Heater3, Heater4, Clap, OpenHH, KickNHat, Kick, ClosedHH];
  const keyNames = ["Heater 1", "Heater 2", "Heater 3", "Heater 4", "Clap", "Open HH", "Kick n' Hat", "Kick", "Closed HH"]
  const keyMapping = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
  const [currentKey, setCurrentKey] = useState("");

  const audioRefs = useRef(audioSources.map(() => React.createRef()));
  const playAudio = (index) => {
    const audio = audioRefs.current[index].current;

    // Reset and play the selected audio
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    // Pause all other audios
    audioRefs.current.forEach((audioRef, idx) => {
      if (idx !== index) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    });

    // Play the selected audio
    audioRefs.current[index].current.play();
    console.log(audioRefs.current[index])
    setCurrentKey(keyNames[index]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const index = keyMapping.indexOf(e.key.toUpperCase());
      audioRefs.current[index].current.pause()
      if (index !== -1) {
        playAudio(index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id='buttons-container'>
        {audioSources.map((source, index) => (
          <div className="drum-pad" onClick={() => playAudio(index)} id={keyMapping[index]} key={index}>
            <audio className="clip" id={keyMapping[index]} ref={audioRefs.current[index]} src={source} />
            {keyMapping[index]}
          </div>
        ))}
      </div>
      <div id='display'>
        <div>
          {currentKey}
        </div>
      </div>
    </div>
  );
}

export default App
