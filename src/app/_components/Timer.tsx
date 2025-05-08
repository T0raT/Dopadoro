"use client";
import { useEffect, useState, useRef } from "react";
import { createTimer, Timer, TimerParams, engine } from "animejs";

function askNotificationPermission() {
  // Check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
    return;
  }
  Notification.requestPermission();
}
engine.pauseOnDocumentHidden = false;

const timerTime = 1500000; // 25 min = 1500000 milliseconds

export default function DopaTimer() {
  const [timeLeft, setTimeLeft] = useState(timerTime);
  const [timerPaused, setTimerPaused] = useState(true);
  const timerRef = useRef<Timer>(null);
  const alertRef = useRef<HTMLAudioElement>(null);

  const timerParams: TimerParams = {
    duration: timerTime,
    autoplay: false,
    frameRate: 1,
    onUpdate: (self) => {
      setTimeLeft(self.duration - self.currentTime);
    },
  };

  useEffect(() => {
    // creates timer and keeps reference to it
    timerRef.current = createTimer(timerParams);
    askNotificationPermission();
  }, []);

  const playPause = () => {
    if (timerPaused) {
      timerRef.current?.play();
    } else {
      timerRef.current?.cancel();
    }
    setTimerPaused(!timerPaused);
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      new Notification("TIME IS NOW DOPAMINE", {
        body: "DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE DOPAMINE",
      });

      timerRef.current?.revert();
      setTimeLeft(timerTime);
      setTimerPaused(true);

      alertRef.current?.play().catch((e) => {
        console.log(`Error playing audio: ${e}`);
      });
    }
  }, [timeLeft]);

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
      <audio ref={alertRef} src="/alarms/gundam.mp3" />
    </>
  );
}
