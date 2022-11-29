import { NextPage } from 'next';
import React from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';

const Live: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  const embedId = 'g_fJ5j_kg40';

  return (
    <div className="md:flex">
      {/* <div className="md:w-[60%] md:m-20 m-5 border-orange border-4">
        <div className="relative overflow-hidden w-[100%] pt-[56%]">
          <iframe
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div> */}
      <div className="md:mt-20 m-5">
        <iframe
          width="1000"
          height="800"
          className="800"
          title="meeting2"
          src="https://genkidama.whereby.com/gnk-roomd6b72ac1-ecdb-4437-b9e9-4e694160378e"
          allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
        />
      </div>
    </div>
  );
};

export default Live;
