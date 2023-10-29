/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// components/AdvertisementModal.js
import React, { useEffect, useState } from 'react';
import useModalAdvertisement from '../../hooks/modalAdvertisement/useModalAdvertisement';

const AdvertisementModalComponent = () => {
  const { shouldShowModal, closeModal } = useModalAdvertisement();
  const [checkedModal, setCheckedModal] = useState(false);

  useEffect(() => {
    if (shouldShowModal) {
      setCheckedModal(true);
    }
  }, [shouldShowModal]);

  if (!shouldShowModal) {
    return null; // Don't render anything if it's not supposed to show.
  }

  const closeModalFn = () => {
    setCheckedModal(false);
    closeModal();
  };

  return (
    <div className="relative mr-2">
      <input
        type="checkbox"
        checked={checkedModal}
        id="my-modal-black-fd"
        className="modal-toggle"
      />
      <label
        htmlFor="my-modal-black-fd"
        className="modal cursor-pointer w-full"
      >
        <label
          className="modal-box relative max-w-none w-full md:w-2/3 text-center"
          htmlFor=""
        >
          <label
            htmlFor="my-modal-black-fd"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => closeModalFn()}
          >
            ✕
          </label>

          <a
            href="https://t.me/Caioaugustobill"
            target="_blank"
            rel="noreferrer"
          >
            <img alt="black_friday" src="/black_friday.jpg" />
          </a>
          <button type="button" className="btn btn-secondary mt-4">
            <a
              href="https://t.me/Caioaugustobill"
              target="_blank"
              rel="noreferrer"
            >
              ENTRE EM CONTATO E ASSINE AGORA!
            </a>
          </button>
        </label>
      </label>
    </div>
  );
};

export default AdvertisementModalComponent;
