import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { SelectModel } from "./select-model";
import { PositionDropDown } from "./postition-drop-down";
import { ApiKeyInput } from "./api-key-input";
import { SettingsPanel } from "./settings-panel";

export function DropdownMenuSetting() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <EllipsisIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-[#192126] border-none" align="end">
        <DropdownMenuItem className="p-0">
          <SelectModel />
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <PositionDropDown />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <SettingsPanel />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
