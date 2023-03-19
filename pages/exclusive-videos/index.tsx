import { NextPage } from 'next';
import React, { useEffect } from 'react';
import ExclusiveVideosContainer from '../../components/exclusiveVideo/exclusiveVideosContainer.component';
import { useAccessControl } from '../../hooks/accessControl';

const ExclusiveVideos: NextPage = () => {
  const { checkLimitedAccess } = useAccessControl();

  useEffect(() => {
    checkLimitedAccess();
  }, []);

  return (
    <div>
      <p className="text-center text-4xl font-bold mt-10">Videos Exclusivos</p>
      <div className="flex flex-col-reverse xl:flex-row p-10 justify-around">
        <ExclusiveVideosContainer />
      </div>
    </div>
  );
};

export default ExclusiveVideos;
