import Head from 'next/head';
import Config from '../components/Config';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="instant-conf web ui" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Config />

    </div>
  );
}
