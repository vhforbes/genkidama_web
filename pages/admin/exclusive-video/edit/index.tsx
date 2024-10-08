import type { NextPage } from 'next';
import React from 'react';
import ExclusiveVideoForm from '../../../../components/exclusiveVideo/exclusiveVideoForm.component';

const EditExclusiveVideo: NextPage = () => {
  return (
    <main className="">
      <h1 className="text-center mt-20">Editar Video exclusivo</h1>
      <ExclusiveVideoForm edit />
    </main>
  );
};

export default EditExclusiveVideo;
