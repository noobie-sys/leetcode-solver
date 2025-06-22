import { useState, useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import { Button } from "../ui/button";
import { BotIcon } from "lucide-react";
import BotCard from "./bot-card";

export type CornerPosition =
  | "top-right"
  | "bottom-right"
  | "top-left"
  | "bottom-left";

export interface BotCardProps {
  cornerPosition: CornerPosition;
  isOpen: boolean;
  onPositionChange: (position: CornerPosition) => void;
}

const BotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cornerPosition, setCornerPosition] =
    useState<CornerPosition>("bottom-right");

  // Load saved position on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem("botPosition") as CornerPosition;
    if (savedPosition) {
      setCornerPosition(savedPosition);
    }
  }, []);

  // Listen for position changes from dropdown
  useEffect(() => {
    const handlePositionChange = (event: CustomEvent<CornerPosition>) => {
      setCornerPosition(event.detail);
    };

    window.addEventListener(
      "botPositionChange",
      handlePositionChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "botPositionChange",
        handlePositionChange as EventListener
      );
    };
  }, []);

  // Calculate button position based on corner
  const getButtonPosition = (corner: CornerPosition) => {
    const buttonSize = 48;
    const margin = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    switch (corner) {
      case "top-right":
        return { x: viewportWidth - buttonSize - margin, y: margin };
      case "bottom-right":
        return {
          x: viewportWidth - buttonSize - margin,
          y: viewportHeight - buttonSize - margin,
        };
      case "top-left":
        return { x: margin, y: margin };
      case "bottom-left":
        return { x: margin, y: viewportHeight - buttonSize - margin };
    }
  };

  const buttonPosition = getButtonPosition(cornerPosition);

  const handlePositionChange = (newPosition: CornerPosition) => {
    setCornerPosition(newPosition);
  };

  return (
    <>
      {/* Main Button */}
      <motion.div
        style={{
          position: "fixed",
          left: buttonPosition.x,
          top: buttonPosition.y,
          zIndex: 50,
          pointerEvents: "none",
        }}
        animate={{
          left: buttonPosition.x,
          top: buttonPosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.5,
        }}
      >
        {/* Bot Button */}
        <motion.div
          style={{ pointerEvents: "auto" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <Button
            variant="default"
            className="p-4 !bg-[#09131A] !hover:bg-[#09131A] rounded-full border-none w-12 h-12 shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BotIcon className="w-8 h-8 text-[#dedede] pointer-events-none" />
          </Button>
        </motion.div>
      </motion.div>

      <BotCard
        cornerPosition={cornerPosition}
        isOpen={isOpen}
        onPositionChange={handlePositionChange}
      />
    </>
  );
};

export default BotButton;
