import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { LuMoon, LuSun } from "react-icons/lu";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="secondary"
      className="py-5"
      aria-label="theme-toggle
      "
    >
      <LuMoon className="dark:hidden" size={20} />
      <LuSun className="hidden dark:block" size={20} />
    </Button>
  );
};
