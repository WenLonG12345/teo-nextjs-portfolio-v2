import { useTheme } from "next-themes";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

interface IThemeSwitch {
  iconColor?: string;
}

const ThemeSwitch: React.FC<IThemeSwitch> = ({ iconColor }) => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      className="text-red"
    >
      {theme === "light" ? (
        <BiSun size={24} color={iconColor} />
      ) : (
        <BiMoon size={24} color={iconColor} />
      )}
    </button>
  );
};

export default ThemeSwitch;
