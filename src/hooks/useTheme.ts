import { useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

// Create a singleton for theme state to avoid redundant calculations
let cachedTheme: Theme | null = null;
let themeInitialized = false;

export function useTheme() {
  // Always start with 'dark' on the server to avoid hydration mismatch
  const [theme, setInternalTheme] = useState<Theme>(cachedTheme || 'dark');

  // Memoized theme setter to avoid recreating on each render
  const setTheme = useCallback((newTheme: Theme) => {
    cachedTheme = newTheme;
    setInternalTheme(newTheme);
    // Update localStorage immediately to avoid delays
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }, []);

  // Initialize theme only once on client-side
  useEffect(() => {
    if (typeof window === 'undefined' || themeInitialized) return;
    
    // Function to determine initial theme
    const initializeTheme = () => {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        setTheme(savedTheme);
        return;
      }
      
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    };

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      initializeTheme();
      themeInitialized = true;
    });
  }, [setTheme]);

  // Listen for system preference changes - only if no user preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
  }, [setTheme]);

  return { theme, setTheme };
}
