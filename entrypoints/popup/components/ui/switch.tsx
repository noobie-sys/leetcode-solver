import * as React from "react";
import { cn } from "../../lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "w-7 h-4 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ring/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-background after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-background after:border-border after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary",
            checked && "bg-primary",
            className
          )}
        />
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
