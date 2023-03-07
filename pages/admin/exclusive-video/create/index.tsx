import type { NextPage } from 'next';
import React from 'react';
import ExclusiveVideoForm from '../../../../components/exclusiveVideo/exclusiveVideoForm.component';

const CreateExclusiveVideo: NextPage = () => {
  return (
    <main className="">
      <h1 className="text-center mt-20">Criar Video exclusivo</h1>
      <ExclusiveVideoForm create />
    </main>
  );
};

export default CreateExclusiveVideo;
