import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CornerPosition } from ".";
import { useState, useEffect } from "react";

export function PositionDropDown() {
  const [position, setPosition] = useState<CornerPosition>("bottom-right");

  // Load saved position on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem("botPosition") as CornerPosition;
    if (savedPosition) {
      setPosition(savedPosition);
    }
  }, []);

  const handlePositionChange = (newPosition: CornerPosition) => {
    setPosition(newPosition);
    localStorage.setItem("botPosition", newPosition);

    // Dispatch custom event to notify bot component
    window.dispatchEvent(
      new CustomEvent("botPositionChange", { detail: newPosition })
    );
  };

  return (
    <Select value={position} onValueChange={handlePositionChange}>
      <SelectTrigger className="w-full border-none  text-sm truncate">
        <SelectValue placeholder="Select a position" />
      </SelectTrigger>
      <SelectContent className="bg-[#192126] border ">
        <SelectGroup>
          <SelectItem value="top-right">Top Right</SelectItem>
          <SelectItem value="bottom-right">Bottom Right</SelectItem>
          <SelectItem value="top-left">Top Left</SelectItem>
          <SelectItem value="bottom-left">Bottom Left</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
