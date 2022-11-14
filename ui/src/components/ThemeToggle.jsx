import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [ isAnimating, setIsAnimating ] = useState(false);
  const [ mounted, setMounted ] = useState(false);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return(
    <div
      className={`
        text-2xl
        select-none
        cursor-pointer
        ${isAnimating && 'animate-[wiggle_200ms_ease-in-out]'}
      `}
      onClick={() => {
        setIsAnimating(true);
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
      onAnimationEnd={() => {setIsAnimating(false)}}
    >
      {currentTheme === 'dark' ? '🌞' : '🌚'}
    </div>
  );
}