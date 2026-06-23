"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ThemeContextValue {
  progress: number;
  isDark: boolean;
  navIsDark: boolean;
  setTransitionProgress: (p: number) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  progress: 0,
  isDark: false,
  navIsDark: false,
  setTransitionProgress: () => {},
});

export function useScrollTheme() {
  return useContext(ThemeContext);
}

export function ScrollThemeProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [productsVisible, setProductsVisible] = useState(false);

  useEffect(() => {
    const products = document.getElementById("products");
    if (!products) return;

    const observer = new IntersectionObserver(
      ([entry]) => setProductsVisible(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(products);
    return () => observer.disconnect();
  }, []);

  const navIsDark = productsVisible || progress > 0.45;
  const isDark = productsVisible || progress > 0.85;

  return (
    <ThemeContext.Provider
      value={{
        progress,
        isDark,
        navIsDark,
        setTransitionProgress: setProgress,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
