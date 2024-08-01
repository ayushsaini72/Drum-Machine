import React, { useRef, useEffect } from 'react'
import Heater1 from "../assets/Heater-1.mp3"
import Heater2 from "../assets/Heater-2.mp3"
import Heater3 from "../assets/Heater-3.mp3"
import Heater4 from "../assets/Heater-4_1.mp3"
import Heater6 from "../assets/Heater-6.mp3"
import CevH2 from "../assets/Cev_H2.mp3"
import DscOh from "../assets/Dsc_Oh.mp3"
import KickNHat from "../assets/Kick_n_Hat.mp3"
import Rp4Kick1 from "../assets/RP4_KICK_1.mp3"

export default function Buttons() {

  const audioSources = [Heater1, Heater2, Heater3, Heater4, Heater6, CevH2, DscOh, KickNHat, Rp4Kick1];
  const keyMapping = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

  const audioRefs = useRef(audioSources.map(() => React.createRef()));

  const playAudio = (index) => {
    // Pause all other audios
    audioRefs.current.forEach((audioRef, idx) => {
      if (idx !== index) {
        audioRef.current.pause();
      }
    });

    // Play the selected audio
    audioRefs.current[index].current.play();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const index = keyMapping.indexOf(e.key.toUpperCase());
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
    <div id='buttons-container'>
      {audioSources.map((source, index) => (
        <div className="drum-pad" key={index}>
          <audio ref={audioRefs.current[index]} src={source} />
          <button onClick={() => playAudio(index)}>{keyMapping[index]}</button>
        </div>
      ))}
    </div>
  );
}
