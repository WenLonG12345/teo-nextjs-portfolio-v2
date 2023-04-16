import React, { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  createEmotionCache
} from "@mantine/core";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { NextFont } from "@next/font";

interface IThemeProvider {
  children: React.ReactNode;
  customFont: NextFont;
}

const ThemeProvider: React.FC<IThemeProvider> = ({ children, customFont }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value: ColorScheme) => setColorScheme(value);

  const emotionCache = createEmotionCache({ key: 'mantine' });

  return (
    <NextThemeProvider attribute="class">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          // withNormalizeCSS
          withGlobalStyles
          withCSSVariables
          emotionCache={emotionCache}
          theme={{
            colorScheme: colorScheme,
            fontFamily: customFont.style.fontFamily,
            colors: {
              emerald: [
                "#547A7A",
                "#487373",
                "#3C6E6E",
                "#316969",
                "#266666",
                "#1C6464",
                "#116363",
                "#175252",
                "#1A4444",
                "#1B3A3A",
              ],
            },
            primaryColor: "emerald",
          }}
        >
          <div className="font-greycliff">{children}</div>
        </MantineProvider>
      </ColorSchemeProvider>
    </NextThemeProvider>
  );
};

export default ThemeProvider;
