import type { NextPage } from 'next';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import routes from '../../../enums/routes';
import { useAccessControl } from '../../../hooks/accessControl';
import { useToast } from '../../../hooks/toast';
import privateApi from '../../../services/privateApi';
import { ErrorResponse } from '../../../interfaces/ErrorResponse';

interface BitgetUIDReponse {
  id: string;
  BitgetUID: string;
}

const BitgetAssociated: NextPage = () => {
  const { addToast } = useToast();
  const { checkAdmin } = useAccessControl();

  useEffect(() => {
    checkAdmin();
  }, []);

  const [associatedList, setAssociatedList] = useState([]);
  const [newUidsList, setNewUidsList] = useState('');

  const getList = async () => {
    const { data } = await privateApi.get(`${routes.bitget}/associated`);
    setAssociatedList(data);
  };

  const updateList = async () => {
    const splitedUids = newUidsList.split('/');

    try {
      await privateApi.post(`${routes.bitget}/associated`, {
        uidList: splitedUids,
      });

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Lista atualizada com sucesso :)',
      });
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível atualizar a lista de associados bitget',
      });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <main className="flex flex-col items-center max-w-4xl m-auto">
      <h1 className="text-center mt-10 text-3x">Atualizar associados Bitget</h1>
      <br />
      <textarea
        className="w-full h-60 p-4 bg-deepBlue border-none outline-none rounded-lg"
        onChange={e => setNewUidsList(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-secondary mt-4"
        onClick={updateList}
      >
        Atualizar
      </button>
      <p className="mt-4">Associados existentes na base:</p>
      <div className="mt-4 text-center">
        {!associatedList ? (
          <p>Loading...</p>
        ) : (
          associatedList.map((associated: BitgetUIDReponse) => (
            <span key={associated.id}>{associated.BitgetUID} | </span>
          ))
        )}
      </div>
    </main>
  );
};

export default BitgetAssociated;
