import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Rocket } from "lucide-react";

const ProgressBar = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const controls = useAnimation();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".md\\:max-w-\\[50\\%\\] > .card");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          setCurrentCard(index);
        }
      });
    }, observerOptions);

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      const { height } = progressBarRef.current.getBoundingClientRect();
      const cardCount = 3;
      const rocketHeight = 36;
      const adjustedHeight = height - rocketHeight;
      const stepSize = adjustedHeight / (cardCount - 1);
      const newY = currentCard * stepSize;

      const rotationProgress = currentCard / (cardCount - 1);
      const newRotation = 135 - rotationProgress * 180;

      controls.start({
        y: newY,
        rotate: newRotation,
        transition: { type: "spring", stiffness: 100, damping: 15 },
      });
    }
  }, [currentCard, controls]);

  return (
    <div
      ref={progressBarRef}
      className="relative border border-cyan-400/40 rounded-xl w-[1vw] backdrop-blur-3xl"
    >
      <motion.div
        className="absolute"
        style={{ left: "calc(50% - 18px)", top: 0 }}
        animate={controls}
        initial={{ rotate: 135 }}
      >
        <Rocket size={36} className="text-cyan-400" />
      </motion.div>
    </div>
  );
};

export default ProgressBar;
