import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import ExclusiveVideosContainer from '../components/exclusiveVideo/exclusiveVideosContainer.component';
import { useAccessControl } from '../hooks/accessControl';
import { useAuth } from '../hooks/auth';
import FilteredTradeOperationsContainer from '../components/tradeOperations/filteredTradeOperationsContainer';

const Home: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { checkLimitedAccess, currentAccess } = useAccessControl();

  useEffect(() => {
    if (user) {
      checkLimitedAccess();
    }

    if (!user) {
      router.push('/sign-in');
    }
  }, []);

  if (currentAccess)
    return (
      <div>
        <main className="h-full hidden md:block">
          {/* <Loader /> */}
          <div className="flex flex-col-reverse xl:flex-row p-10 justify-around">
            <div className="w-4/5">
              <FilteredTradeOperationsContainer editable={false} />
            </div>
            <div className="w-1/5">
              <p className="text-2xl font-bold mb-8 text-center">
                VÍDEOS EXCLUSIVOS:
              </p>
              <ExclusiveVideosContainer editable={false} />
            </div>
          </div>
        </main>

        {/* 
        
        ------ MOBILE MENU -----
        
        */}
        <main className="md:hidden flex flex-col justify-evenly p-4 mt-4">
          <a href="/operations" className="btn btn-secondary">
            Operações
          </a>
          <a href="/exclusive-videos" className="btn btn-secondary mt-10">
            Videos Exclusivos
          </a>
        </main>
      </div>
    );

  return null;
};

export default Home;
