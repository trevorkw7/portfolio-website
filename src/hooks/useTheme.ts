import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export function useTheme() {
  // Always start with 'dark' on the server to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>('dark');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Skip if already initialized
    if (isInitialized) return;

    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      setIsInitialized(true);
      return;
    }
    
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    
    setIsInitialized(true);
  }, [isInitialized]);

  // Update localStorage when theme changes, but only after initialization
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('theme', theme);
  }, [theme, isInitialized]);

  // Listen for system preference changes
  useEffect(() => {
    if (!isInitialized) return;

    // Only apply system preference if no user preference is stored
    const hasStoredPreference = localStorage.getItem('theme') !== null;
    if (hasStoredPreference) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isInitialized]);

  return { theme, setTheme };
}
