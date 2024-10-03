// pages/_app.js
import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Sidebar from '../components/Sidebar';

export default function App({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'dark', // Change this to 'dark' if you want dark mode by default
  });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
}
