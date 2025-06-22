import { useState, useEffect } from "react";

export type ModelType = "gpt-4o" | "gemini-2.0-flash-lite-preview-02-05";

const useModel = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>("gpt-4o");

  const handleModelChange = (model: ModelType) => {
    setSelectedModel(model);
    // Here you could also save to localStorage or send to background script
    localStorage.setItem("selectedModel", model);
  };

  // Load saved model on mount
  useEffect(() => {
    const savedModel = localStorage.getItem("selectedModel") as ModelType;
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  return {
    selectedModel,
    setSelectedModel: handleModelChange,
  };
};

export default useModel;
