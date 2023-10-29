// contexts/AdvertisementContext.js
import { createContext } from 'react';

const ModalAdvertisementContext = createContext({
  shouldShowModal: false,
  closeModal: () => {},
});

export default ModalAdvertisementContext;
