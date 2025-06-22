import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Context for managing application theme state (light/dark mode)
 * Provides theme switching functionality with persistence and system preference detection
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider component that manages theme state and persistence
 * 
 * Features:
 * - Detects system color scheme preference on first load
 * - Persists theme choice in localStorage
 * - Updates document data-theme attribute for CSS theming
 * - Provides theme toggle functionality
 * 
 * @param children - Child components that will have access to theme context
 */
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference or system preference
    // SSR-safe: only access localStorage and window on client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    }
  }, []);

  useEffect(() => {
    // Update data-theme attribute when theme changes
    // This enables CSS-based theming via [data-theme="dark"] selectors
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Persist theme choice for future sessions
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  /**
   * Toggles between light and dark theme
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 * 
 * @returns Theme context containing current theme and toggle function
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * const isDark = theme === 'dark';
 * ```
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 