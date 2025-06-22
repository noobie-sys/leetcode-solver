import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SettingsIcon, SaveIcon } from "lucide-react";
import useSettings from "../../hooks/use-settings";

export function SettingsPanel() {
  const { settings, updateSettings } = useSettings();

  const handleSave = () => {
    // Settings are automatically saved when updated
    console.log("Settings saved:", settings);
  };

  return (
    <div className="p-2 space-y-3 w-full">
      <div className="flex items-center gap-2">
        <SettingsIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Settings</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-open" className="text-xs">
            Auto-open on page load
          </Label>
          <input
            type="checkbox"
            id="auto-open"
            checked={settings.autoOpen}
            onChange={(e) => updateSettings({ autoOpen: e.target.checked })}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring/50 focus:ring-2"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="animation" className="text-xs">
            Animation Speed
          </Label>
          <select
            id="animation"
            value={settings.animationSpeed}
            onChange={(e) =>
              updateSettings({ animationSpeed: e.target.value as any })
            }
            className="w-full text-xs p-1 border border-border rounded bg-background text-foreground"
          >
            <option value="fast">Fast</option>
            <option value="normal">Normal</option>
            <option value="slow">Slow</option>
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="w-full"
        >
          <SaveIcon className="w-3 h-3 mr-1" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
