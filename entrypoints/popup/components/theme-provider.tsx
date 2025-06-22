import { createContext, useContext, useEffect } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: "dark";
  setTheme: (theme: "dark") => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    // Find the extension container
    const extensionContainer = document.getElementById(
      "__leetcode_helper_container"
    );

    if (!extensionContainer) {
      console.warn("Extension container not found");
      return;
    }

    // Always apply dark theme
    extensionContainer.classList.remove("light");
    extensionContainer.classList.add("dark");
  }, []);

  const value = {
    theme: "dark" as const,
    setTheme: () => {
      // No-op since we only support dark mode
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
