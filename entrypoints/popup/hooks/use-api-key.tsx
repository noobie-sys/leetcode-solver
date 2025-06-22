import { useState, useEffect } from "react";

const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    setIsApiKeySet(key.length > 0);
    localStorage.setItem("apiKey", key);
  };

  const clearApiKey = () => {
    setApiKey("");
    setIsApiKeySet(false);
    localStorage.removeItem("apiKey");
  };

  // Load saved API key on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("apiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeySet(true);
    }
  }, []);

  return {
    apiKey,
    isApiKeySet,
    setApiKey: handleApiKeyChange,
    clearApiKey,
  };
};

export default useApiKey;
