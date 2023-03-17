import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';
import { useAccessControl } from '../../hooks/accessControl';
import NoAccessCompnent from '../../components/noAccess/noAccessComponent';

const Live: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { getUserAccess, currentAccess } = useAccessControl();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  useEffect(() => {
    getUserAccess();
  }, []);

  if (currentAccess?.hasFullAccess)
    return (
      <div>
        <iframe
          className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
          title="meeting2"
          src="https://genkidama.whereby.com/gnk-roomd6b72ac1-ecdb-4437-b9e9-4e694160378e"
          allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
        />
      </div>
    );

  return <NoAccessCompnent />;
};

export default Live;
