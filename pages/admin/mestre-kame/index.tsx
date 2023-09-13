import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { useAccessControl } from '../../../hooks/accessControl';
import { useMestreKame } from '../../../hooks/mestreKame';

const MestreKame: NextPage = () => {
  const { checkAdmin } = useAccessControl();
  const { broadcastMessage } = useMestreKame();

  const [message, setMessage] = useState('');
  const [fileURL, setFileUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [toGroup, setToGroup] = useState(true);
  const [toUsers, setToUsers] = useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  const handleGroupChange = () => {
    setToGroup(!toGroup);
  };

  const handleUsersChange = () => {
    setToUsers(!toUsers);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFileUrl(URL.createObjectURL(e.target.files[0]) as string);
  };

  const handleUpload = async () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      if (file) {
        broadcastMessage({
          message,
          image: fileInputRef.current.files[0],
          toGroup,
          toUsers,
        });
      }
    }
  };

  return (
    <main className="items-center">
      <h1 className="text-center mt-20 text-3xl">Mestre Kame</h1>
      <div className="flex flex-col items-center mt-16 mx-20">
        <p>Enviar mensagem</p>
        <br />
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Broadcast message"
          onChange={e => setMessage(e.target.value)}
        />

        {fileURL && (
          <img
            className="mt-8 border-lightTeal border-4 rounded-lg bg-[#fff] p-4"
            alt="uploaded-file"
            src={fileURL}
          />
        )}

        <input
          className="mt-8 text-center"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="flex mt-8">
          <div className="flex items-center mx-4">
            <input
              id="toGroup"
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={toGroup}
              onChange={handleGroupChange}
            />
            <label htmlFor="toGroup" className="ml-2 text-gray-700">
              Grupo
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="toUsers"
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={toUsers}
              onChange={handleUsersChange}
            />
            <label htmlFor="toUsers" className="ml-2 text-gray-700">
              Users
            </label>
          </div>
        </div>

        <button
          onClick={handleUpload}
          type="button"
          className="btn btn-secondary mt-10"
          disabled={!toGroup && !toUsers}
        >
          Enviar mensagem
        </button>
      </div>
    </main>
  );
};

export default MestreKame;
