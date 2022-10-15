import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import PostComponent from '../components/Post.component';
import postsList from '../public/mocks/postsList.json';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <div className="flex flex-col md:flex-row p-10">
          <div className="w-auto md:w-2/3 md:mr-16">
            {postsList.posts.map(post => {
              const { title, content } = post;
              return (
                <PostComponent title={title} content={content} key={post.id} />
              );
            })}
          </div>
          <div>Some other content in here</div>
        </div>
      </main>
    </div>
  );
};

export default Home;
