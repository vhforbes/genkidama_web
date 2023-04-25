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
          {!user?.telegramId ? (
            <h1 className="text-center">
              Você não falou com o Mestre Kame, assim não irá receber as
              atualizações no seu telegram :(
            </h1>
          ) : null}
          <div className="flex flex-col xl:flex-row p-10 justify-around">
            <div className="w-full xl:w-5/6">
              <p className="text-2xl font-bold mb-8 text-center">OPERAÇÕES:</p>
              <FilteredTradeOperationsContainer editable={false} />
            </div>
            <div className="2xl:ml-8 xl:w-1/6 h-full ">
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
