import { NextPage } from 'next';
import React, { useEffect, useRef } from 'react';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';

const Live: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const zoomRef = useRef(null);

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  const embedId = 'g_fJ5j_kg40';

  const zoomDiv = document.createElement('div');

  // const meetingSDKElement = document.getElementById('meetingSDKElement');
  console.log(zoomDiv);

  useEffect(() => {
    const client = ZoomMtgEmbedded.createClient();

    console.log(client);

    // client.init({
    //   debug: true,
    //   zoomAppRoot: zoomDiv,
    //   language: 'en-US',
    //   customize: {
    //     meetingInfo: [
    //       'topic',
    //       'host',
    //       'mn',
    //       'pwd',
    //       'telPwd',
    //       'invite',
    //       'participant',
    //       'dc',
    //       'enctype',
    //     ],
    //     toolbar: {
    //       buttons: [
    //         {
    //           text: 'Custom Button',
    //           className: 'CustomButton',
    //           onClick: () => {
    //             console.log('custom button');
    //           },
    //         },
    //       ],
    //     },
    //   },
    // });
  }, []);

  console.log(zoomRef);

  return (
    <div className="md:flex">
      <div className="md:w-[60%] md:m-20 m-5 border-orange border-4">
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
      </div>
      <div className="md:mt-20 m-5"></div>
    </div>
  );
};

export default Live;
