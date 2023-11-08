import React, { useEffect, useState } from 'react';

import ModalAdvertisementContext from './modalAdvertisementContext';

interface Props {
  children: React.ReactNode;
}

const ModalAdvertisementProvider: React.FC<Props> = ({ children }) => {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [modalName] = useState('blackFriday');

  useEffect(() => {
    const lastShownTimestamp = localStorage.getItem(modalName);
    const currentTime = new Date().getTime();

    if (!lastShownTimestamp) {
      // If the modal has never been shown, show it
      setShouldShowModal(true);
    } else {
      const timeDiff = currentTime - Number(lastShownTimestamp);
      const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day

      if (timeDiff > oneDay) {
        // If it's been more than a day, show it again
        setShouldShowModal(true);
      }
    }
  }, []);

  const closeModal = () => {
    setShouldShowModal(false);
    localStorage.setItem(modalName, new Date().getTime().toString());
  };

  return (
    <ModalAdvertisementContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        shouldShowModal,
        closeModal,
      }}
    >
      {/* <AdvertisementModalComponent /> */}
      {children}
    </ModalAdvertisementContext.Provider>
  );
};

export default ModalAdvertisementProvider;
