import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import ExclusiveVideoForm from '../../../../components/exclusiveVideo/exclusiveVideoForm.component';
import { useAccessControl } from '../../../../hooks/accessControl';

const CreateExclusiveVideo: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <main className="">
      <h1 className="text-center mt-20">Criar Video exclusivo</h1>
      <ExclusiveVideoForm create />
    </main>
  );
};

export default CreateExclusiveVideo;
