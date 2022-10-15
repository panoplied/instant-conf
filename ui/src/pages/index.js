import Head from 'next/head';
import Config from '../components/Config';
import { ConfigContextProvider } from '../context/ConfigContext';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="instant-conf web ui" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConfigContextProvider>
        <Config />
      </ConfigContextProvider>

    </div>
  );
}
