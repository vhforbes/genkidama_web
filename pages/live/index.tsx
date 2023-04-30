import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';
import { useAccessControl } from '../../hooks/accessControl';
import NoAccessCompnent from '../../components/noAccess/noAccessComponent';

const Live: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { checkFullAccess, currentAccess } = useAccessControl();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  useEffect(() => {
    checkFullAccess();
  }, []);

  if (currentAccess)
    return (
      <div>
        <iframe
          className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
          title="meeting2"
          src="https://genkidama.whereby.com/genkidama4fe3053d-456c-4bbd-87c9-a1132ec0a0b7"
          allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
        />
      </div>
    );

  return <NoAccessCompnent />;
};

export default Live;
