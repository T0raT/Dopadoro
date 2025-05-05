"use client";
import { useEffect, useState, useRef } from "react";
import { createTimer, Timer, TimerParams, engine } from "animejs";

export default function DopaTimer() {
  const [timeLeft, setTimeLeft] = useState(1500000);
  const [timerPaused, setTimerPaused] = useState(true);
  const timerRef = useRef<Timer>(null);

  const timerParams: TimerParams = {
    duration: 1500000,
    autoplay: false,
    frameRate: 1,
    onUpdate: (self) => {
      setTimeLeft(self.duration - self.currentTime);
    },
  };

  useEffect(() => {
    // creates timer and keeps reference to it
    engine.pauseOnDocumentHidden = false;
    timerRef.current = createTimer(timerParams);
  }, []);

  const playPause = () => {
    if (timerPaused) {
      timerRef.current?.play();
    } else {
      timerRef.current?.cancel();
    }
    setTimerPaused(!timerPaused);
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <p>{formatTime(timeLeft)}</p>
      <button onClick={playPause} className="m-auto">
        {timerPaused ? "Start" : "Pause"}
      </button>
    </>
  );
}
