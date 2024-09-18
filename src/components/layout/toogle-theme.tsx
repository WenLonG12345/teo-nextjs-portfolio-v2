import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="justify-start w-full"
    >
      <div className="flex gap-2 dark:hidden">
        <Moon className="size-5" />
        <span className="block lg:hidden">Dark Mode</span>
      </div>

      <div className="hidden gap-2 dark:flex">
        <Sun className="size-5" />
        <span className="block lg:hidden">Light Mode</span>
      </div>

      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
};
