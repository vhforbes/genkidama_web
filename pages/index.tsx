import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import PostsContainerComponent from '../components/posts/postsContainer.component';
import { useAuth } from '../hooks/auth';

const Home: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full">
        {/* <Loader /> */}
        <div className="flex flex-col-reverse 2xl:flex-row p-10">
          <div className="w-auto md:w-4/5 md:mr-16">
            <PostsContainerComponent />
          </div>
          <div>
            Some other content in here: grafico bitcoin? Gatilhos? Operacoes
            abertas? Calendario de lives para membros? Give me more ideasss
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
