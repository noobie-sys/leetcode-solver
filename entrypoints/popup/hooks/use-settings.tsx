import { useState, useEffect } from "react";

export interface Settings {
  autoOpen: boolean;
  animationSpeed: "fast" | "normal" | "slow";
}

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    autoOpen: false,
    animationSpeed: "normal",
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem("settings", JSON.stringify(updatedSettings));
  };

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        // Remove theme from saved settings if it exists
        const { theme, ...settingsWithoutTheme } = parsedSettings;
        setSettings(settingsWithoutTheme);
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
  }, []);

  return {
    settings,
    updateSettings,
  };
};

export default useSettings;
