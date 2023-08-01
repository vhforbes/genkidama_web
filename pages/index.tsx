import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

import ExclusiveVideosContainer from '../components/exclusiveVideo/exclusiveVideosContainer.component';
import { useAccessControl } from '../hooks/accessControl';
import { useAuth } from '../hooks/auth';
import FilteredTradeOperationsContainer from '../components/tradeOperations/filteredTradeOperationsContainer';
import NoAccessCompnent from '../components/noAccess/noAccessComponent';
import TradeOperationsResumeCard from '../components/tradeOperations/tradeOperationsResumeCard';
import { useSubscription } from '../hooks/subscription';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const { currentAccess, getUserAccess } = useAccessControl();
  const { checkSub } = useSubscription();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!user) {
      router.push('/home');
      return;
    }

    if (user) {
      getUserAccess();
      checkSub();
    }

    if (!user?.telegramId) {
      refreshUser();
    }

    if (!theme) {
      setTheme('dark');
    }
  }, []);

  return (
    <div>
      {/* CHECK IF USER HAS ALREADY TALKED TO BOT */}

      {currentAccess.hasFullAccess && !user?.telegramId ? (
        <h1 className="text-center text-red text-xl mt-4 dark:bg-lightTeal">
          Você ainda não falou com o @MestreKamee_bot, assim não irá receber as
          atualizações no seu telegram.
        </h1>
      ) : null}

      <main className="h-full hidden md:block">
        <div className="flex flex-col xl:flex-row p-10 justify-around">
          <div className="w-full xl:w-5/6">
            <p className="text-2xl font-bold mb-8 text-center">OPERAÇÕES:</p>

            {currentAccess.hasFullAccess ? (
              <FilteredTradeOperationsContainer editable={false} />
            ) : (
              <NoAccessCompnent />
            )}
          </div>

          <div className="2xl:ml-8 xl:w-1/6 h-full ">
            <div className="mb-8">
              <p className="text-2xl font-bold mb-8 text-center">
                PAINEL OPERAÇÕES:
              </p>
              <TradeOperationsResumeCard />
            </div>

            <p className="text-2xl font-bold mb-8 text-center">
              VÍDEOS EXCLUSIVOS:
            </p>
            {currentAccess.hasLimitedAccess && !currentAccess.hasFullAccess ? (
              <ExclusiveVideosContainer editable={false} />
            ) : null}
            {currentAccess.hasFullAccess ? (
              <ExclusiveVideosContainer editable={false} />
            ) : null}
            {!currentAccess.hasFullAccess && !currentAccess.hasLimitedAccess ? (
              <NoAccessCompnent />
            ) : null}
          </div>
        </div>
      </main>

      {/* 
        
        ------ MOBILE VIEW -----
        
        */}
      <main className="md:hidden flex flex-col justify-evenly p-4 mt-4">
        <div className="mb-8">
          <p className="text-2xl font-bold mb-8 text-center">
            PAINEL OPERAÇÕES:
          </p>
          <TradeOperationsResumeCard />
        </div>
        <a href="/operations" className="btn btn-secondary">
          Operações
        </a>
        <a href="/exclusive-videos" className="btn btn-secondary mt-10">
          Videos Exclusivos
        </a>
      </main>
    </div>
  );
};

export default Home;
