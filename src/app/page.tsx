"use client";
import { useEffect, useState, useRef } from "react";
import { createTimer, Timer, TimerParams, engine } from "animejs";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(1500000);
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

  const playTimer = () => {
    timerRef.current?.play();
  };

  function formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-departure-mono)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>{formatTime(timeLeft)}</p>
        <button onClick={playTimer} className="m-auto">
          Play
        </button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
