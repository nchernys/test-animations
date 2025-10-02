"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import styles from "./confetti.module.css";

interface CelebrationConfettiProps {
  setShowCelebrate: (value: boolean) => void;
  maxBursts?: number;
}

export default function CelebrateConfetti({
  setShowCelebrate,
  maxBursts = 12,
}: CelebrationConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const myConfetti = confetti.create(canvasRef.current, { resize: true });

    const duration = 2300;
    const interval = 180 - Math.random() * 25;
    const end = Date.now() + duration;

    const positions = [
      { x: 0.3, y: 0.45 },
      { x: 0.6, y: 0.18 },
      { x: 0.65, y: 0.5 },
      { x: 0.4, y: 0.35 },
      { x: 0.35, y: 0.15 },
      { x: 0.5, y: 0.7 },
      { x: 0.7, y: 0.25 },
      { x: 0.65, y: 0.6 },
    ];

    let i = 0;
    let burstCount = 0;

    const intervalId = setInterval(() => {
      if (burstCount >= maxBursts) {
        clearInterval(intervalId);
        setTimeout(() => {
          setShowCelebrate(false);
        }, 3500); // increase time to ensure fading out completes without an abrupt interruption
        return;
      }

      const pos = positions[i % positions.length];
      myConfetti({
        particleCount: 100,
        startVelocity: 35,
        decay: 0.82,
        ticks: 200,
        gravity: 1.5,
        spread: 360,
        shapes: ["square", "circle"],
        scalar: 0.95,
        origin: pos,
      });

      i++;
      burstCount++;

      if (Date.now() > end) {
        clearInterval(intervalId);
        setShowCelebrate(false);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [setShowCelebrate, maxBursts]);

  if (typeof window === "undefined") return null; // block SSR

  return <canvas ref={canvasRef} className={styles.confettiBg} />;
}
