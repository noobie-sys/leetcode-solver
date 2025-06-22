import { BotCardProps, CornerPosition } from "..";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { DropdownMenuSetting } from "../drop-down-setting";
import { Button } from "../../ui/button";
import { MessageCircle, Send, ChevronDown } from "lucide-react";
import { ScrollArea } from "../../ui/scroll-area";
import { Input } from "../../ui/input";

const BotCard = ({
  cornerPosition,
  isOpen,
  onPositionChange,
}: BotCardProps) => {
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

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDropdown &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={cardRef}
      className="fixed z-50"
      style={{
        left: `${cardPosition.x}px`,
        top: `${cardPosition.y}px`,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      }}
    >
      <Card
        className="w-96 border-none shadow-lg p-3 gap-4"
        style={{ pointerEvents: "auto" }}
      >
        <CardHeader className="p-2 border-b border-border">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <MessageCircle className="w-5 h-5 text-primary" />
              Solve Leetcode
            </CardTitle>
            <DropdownMenuSetting />
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[300px]">
            <div>Hello developer</div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-1">
          <form className="flex w-full gap-1">
            <Input placeholder="Type your message..." />
            <Button type="submit" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BotCard;
