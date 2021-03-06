import { CssBaseline, GeistProvider } from "@geist-ui/react";
import { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import { Menu } from "../components/Menu/Menu";
import { Title } from "../components/Title";
import { DEFAULT_THEME, THEME_KEY } from "../constants";
import { fetcher } from "../fetcher";
import { usePersistentState } from "../hooks/usePersistentState";
import "../styles/globals.css";

export type Themes = "light" | "dark";
export const ThemeContext = React.createContext<{ theme: Themes; toggleTheme: () => void }>(
  {} as any
);

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = usePersistentState<Themes>(DEFAULT_THEME);

  function toggleTheme() {
    const opposite = theme === "light" ? "dark" : "light";
    window.localStorage.setItem(THEME_KEY, opposite);
    setTheme(opposite);
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <GeistProvider theme={{ type: theme }}>
        <CssBaseline />
        <Title>Home</Title>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Menu />
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </GeistProvider>
    </SWRConfig>
  );
}
