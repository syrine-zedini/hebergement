import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import walkingAnimation from "../assets/walking.json"; // personnage qui marche
import SignupForm from "./SignupForm";

const CharacterScene = () => {
  const [step, setStep] = useState("walk"); // 'walk' → 'form'

  useEffect(() => {
    if (step === "walk") {
      // Simule un petit délai après la marche avant d'afficher le formulaire
      const timer = setTimeout(() => setStep("form"), 3000); // ou selon la durée de l'animation
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-6xl flex items-center justify-center">
        {/* Zone animation personnage */}
        <div className="w-1/2 flex items-center justify-center">
          {step === "walk" && (
            <Lottie
              animationData={walkingAnimation}
              loop={false}
              onComplete={() => setStep("form")}
              style={{ width: 300, height: 300 }}
            />
          )}
        </div>

        {/* Zone formulaire */}
        <div className="w-1/2">
          <AnimatePresence>
            {step === "form" && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <SignupForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CharacterScene;