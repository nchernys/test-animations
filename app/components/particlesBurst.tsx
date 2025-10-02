"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import type { Engine } from "tsparticles-engine";

interface CelebrationParticlesProps {
  setShowCelebrate: (value: boolean) => void;
}

export default function CelebrationParticlesBurst({
  setShowCelebrate,
}: CelebrationParticlesProps) {
  const initParticles = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  if (typeof window === "undefined") return null; // block SSR

  return (
    <Particles
      id="particle-burst"
      init={initParticles}
      loaded={async () => {
        setTimeout(() => setShowCelebrate(false), 8000); // Automatically turn off after 7 seconds
      }}
      options={{
        preset: "confetti",
        fullScreen: { enable: true, zIndex: 9999 },
        background: { color: { value: "transparent" } },

        emitters: [
          {
            position: { x: 50, y: 100 }, // from x: center, y: upward
            size: { width: 10, height: 0 }, // burst origin: screen center bottom
            rate: { quantity: 150, delay: 0.15 },
            life: { duration: 1, count: 1 }, // one burst, 3s duration
          },
        ],

        particles: {
          number: { value: 0 }, // 0 particles
          shape: { type: "circle" },
          size: { value: { min: 4, max: 6 } },
          gravity: { enable: true, acceleration: 9 },
          move: {
            enable: true,
            direction: "top",
            speed: { min: 50, max: 100 }, // initial particle acceleration speed
            straight: false,
            decay: 0.05,
            outModes: {
              default: "destroy",
            },
          },
        },
      }}
    />
  );
}
