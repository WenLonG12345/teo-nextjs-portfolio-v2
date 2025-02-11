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
      className="w-[40px]"
    >
      <div className="flex dark:hidden">
        <Moon className="" />
      </div>

      <div className="hidden dark:flex">
        <Sun className="" />
      </div>
    </Button>
  );
};
