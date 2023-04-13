import { useTheme } from "next-themes";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? <BiSun size={24} /> : <BiMoon size={24} />}
    </button>
  );
};

export default ThemeSwitch;
