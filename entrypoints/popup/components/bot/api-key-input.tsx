import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon, KeyIcon } from "lucide-react";
import useApiKey from "../../hooks/use-api-key";

export function ApiKeyInput() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const { apiKey, isApiKeySet, setApiKey, clearApiKey } = useApiKey();

  const handleSave = () => {
    setApiKey(tempApiKey);
    setTempApiKey("");
  };

  const handleClear = () => {
    clearApiKey();
    setTempApiKey("");
  };

  return (
    <div className="p-2 space-y-2 pointer-events-auto">
      <div className="flex items-center gap-2">
        <KeyIcon className="w-4 h-4" />
        <span className="text-sm font-medium">API Key</span>
      </div>

      {isApiKeySet ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type={showApiKey ? "text" : "password"}
              value={showApiKey ? apiKey : "••••••••••••••••"}
              readOnly
              className="text-xs"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="w-full"
          >
            Clear API Key
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your API key"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            className="text-xs"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={!tempApiKey.trim()}
            className="w-full"
          >
            Save API Key
          </Button>
        </div>
      )}
    </div>
  );
}
