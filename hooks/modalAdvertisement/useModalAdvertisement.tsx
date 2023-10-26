import { useContext } from 'react';
import AdvertisementContext from './modalAdvertisementContext';

const useModalAdvertisement = () => {
  const context = useContext(AdvertisementContext);

  if (!context) {
    throw new Error(
      'useAdvertisement must be used within an AdvertisementProvider',
    );
  }

  return context;
};

export default useModalAdvertisement;
