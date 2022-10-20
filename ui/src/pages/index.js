import { ConfigContextProvider } from '../context/ConfigContext';

// components
import Head from 'next/head';
import Config from '../components/Config';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <div className="font-robotoMonoRegular">

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="instant-conf web ui" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/RobotMono-Regular.ttf" as="font" crossOrigin="" type="font/ttf" />
        <link rel="preload" href="/fonts/RobotMono-Light.ttf" as="font" crossOrigin="" type="font/ttf" />
      </Head>

      <div className="flex flex-row-reverse p-4">
        <ThemeToggle/>
      </div>

      <div className="grid place-items-center bg-zinc-500">
        <ConfigContextProvider>
          <Config />
        </ConfigContextProvider>
      </div>

    </div>
  );
}
