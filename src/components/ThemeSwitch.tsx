import { ColorScheme, useMantineColorScheme } from "@mantine/core";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

interface IThemeSwitch {
  iconColor?: string;
}

const ThemeSwitch: React.FC<IThemeSwitch> = ({ iconColor }) => {
  const { theme, setTheme } = useTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  // toggle theme switch when reload the page
  useEffect(() => {
    toggleColorScheme(theme as ColorScheme);
  }, [theme]);

  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
        toggleColorScheme(theme === "light" ? "dark" : "light");
      }}
      className="swap swap-rotate"
    >
      {theme === "light" ? (
        <BiSun size={24} color={iconColor} className="swap-on" />
      ) : (
        <BiMoon size={24} color={iconColor} className="swap-off" />
      )}
    </button>
  );
};

export default ThemeSwitch;
