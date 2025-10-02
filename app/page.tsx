"use client";
import React, { useState } from "react";
import CelebrationParticles from "./components/particles";
import CelebrationParticlesBurst from "./components/particlesBurst";
import CelebrateConfetti from "./components/confetti";

export default function Home() {
  const [showParticles, setShowParticles] = useState<boolean | null>(null);
  const [showParticlesBurst, setShowParticlesBurst] = useState<boolean | null>(
    null
  );
  const [showConfetti, setShowConfetti] = useState<boolean | null>(null);

  const handleParticles = () => {
    setShowParticles(true);
  };

  const handleParticlesBurst = () => {
    setShowParticlesBurst(true);
  };

  const handleConfetti = () => {
    setShowConfetti(true);
  };

  return (
    <>
      <div className="font-sans flex min-h-screen p-8 pb-20 gap-4 sm:p-20">
        <button onClick={handleParticles}>Click 1</button>
        <button onClick={handleParticlesBurst}>Click 2</button>
        <button onClick={handleConfetti}>Click 3</button>
      </div>

      {showParticles && (
        <CelebrationParticles setShowCelebrate={setShowParticles} />
      )}
      {showParticlesBurst && (
        <CelebrationParticlesBurst setShowCelebrate={setShowParticlesBurst} />
      )}
      {showConfetti && <CelebrateConfetti setShowCelebrate={setShowConfetti} />}
    </>
  );
}
