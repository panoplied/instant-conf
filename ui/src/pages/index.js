import { ConfigContextProvider } from '../context/ConfigContext';
import Head from 'next/head';

// components
import Header from '../components/Header';
import Config from '../components/Config';

export default function Home() {
  return (
    <>
      <Head>
        <title>Instant Conf</title>
        <meta name="description" content="instant-conf web ui" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/RobotoMono-Regular.ttf" as="font" crossOrigin="" type="font/ttf" />
        <link rel="preload" href="/fonts/RobotoMono-Light.ttf" as="font" crossOrigin="" type="font/ttf" />
      </Head>

      <div className="
        font-robotoMonoRegular
        min-h-screen
        bg-stone-50
        dark:bg-stone-900
      ">

        <div className="grid place-items-center pb-96">
          <ConfigContextProvider>
            <Header />
            <Config />
          </ConfigContextProvider>
        </div>

    </div>
  </>
  );
}
