import { ThemeProvider } from 'next-themes';

// styles
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
