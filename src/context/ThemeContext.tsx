import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ThemeColors } from '../types';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // The missing function that caused the error:
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const colors: ThemeColors = {
    bg: isDarkMode ? '#111827' : '#F9FAFB',
    text: isDarkMode ? '#F9FAFB' : '#111827',
    card: isDarkMode ? '#1F2937' : '#FFFFFF',
    border: isDarkMode ? '#374151' : '#E5E7EB',
    accent: '#4F46E5',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};