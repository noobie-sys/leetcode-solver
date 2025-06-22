import React, { useEffect, useRef, useState } from "react";
import { CornerPosition } from "../components/bot";

const usePosition = (cornerPosition: CornerPosition, isOpen: boolean) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!cardRef.current || !isOpen) return;

    const cardWidth = 384; // w-96 = 24rem = 384px
    const cardHeight = 480; // Approximate height based on content
    const buttonSize = 48; // w-12 h-12 = 48px
    const margin = 20; // Margin from screen edges
    const gap = 16; // Gap between button and card

    // Calculate viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = 0;
    let y = 0;

    switch (cornerPosition) {
      case "top-right":
        x = viewportWidth - buttonSize - margin;
        y = margin;
        break;
      case "bottom-right":
        x = viewportWidth - buttonSize - margin;
        y = viewportHeight - buttonSize - margin;
        break;
      case "top-left":
        x = margin;
        y = margin;
        break;
      case "bottom-left":
        x = margin;
        y = viewportHeight - buttonSize - margin;
        break;
    }

    // Calculate card position based on corner
    let cardX = 0;
    let cardY = 0;

    if (cornerPosition.startsWith("top")) {
      // Card appears below the button
      cardY = y + buttonSize + gap;
    } else {
      // Card appears above the button
      cardY = y - cardHeight - gap;
    }

    if (cornerPosition.endsWith("right")) {
      // Align card to the right edge of the button
      cardX = x + buttonSize - cardWidth;
    } else {
      // Align card to the left edge of the button
      cardX = x;
    }

    // Ensure card stays within viewport bounds
    cardX = Math.max(
      margin,
      Math.min(cardX, viewportWidth - cardWidth - margin)
    );
    cardY = Math.max(
      margin,
      Math.min(cardY, viewportHeight - cardHeight - margin)
    );

    setCardPosition({ x: cardX, y: cardY });
  }, [cornerPosition, isOpen]);

  return {
    cardPosition,
    setCardPosition,
    showDropdown,
    setShowDropdown,
    cardRef,
  };
};

export default usePosition;
