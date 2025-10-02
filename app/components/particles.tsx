"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import type { Engine } from "tsparticles-engine";

interface CelebrationParticlesProps {
  setShowCelebrate: (value: boolean) => void;
}

export default function CelebrationParticles({
  setShowCelebrate,
}: CelebrationParticlesProps) {
  const initParticles = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  return (
    <Particles
      id="confetti"
      init={initParticles}
      loaded={async () => {
        setTimeout(() => setShowCelebrate(false), 7000); // Automatically turn off after 7 seconds
      }}
      options={{
        preset: "confetti",
        fullScreen: { enable: true, zIndex: 9999 },
        background: { color: { value: "transparent" } },

        emitters: [
          {
            position: { x: 50, y: 105 }, // from x: center, y: upward
            size: { width: 100, height: 0 }, // burst origin: entire scren width
            life: { duration: 3, count: 1 }, // one burst, 3s duration
          },
        ],

        particles: {
          number: { value: 400 }, // 400 particles
          shape: { type: "circle" },
          size: { value: { min: 6, max: 8 } },
          gravity: { enable: true, acceleration: 10 },
          move: {
            enable: true,
            direction: "top",
            speed: { min: 10, max: 30 },
            straight: true,
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
