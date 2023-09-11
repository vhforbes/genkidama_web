import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTradeOperationHistory } from '../../hooks/tradeOperations/tradeOperationHistory';
import TradeOperationCard from '../../components/tradeOperations/tradeOperationCard';
import { useFollowTradeOperations } from '../../hooks/tradeOperations/followingTradeOperations';
import { useAccessControl } from '../../hooks/accessControl';
import NoAccessCompnent from '../../components/noAccess/noAccessComponent';
import { useAuth } from '../../hooks/auth';

const OperationPage = () => {
  const router = useRouter();
  const { checkFullAccess, currentAccess } = useAccessControl();
  const { user } = useAuth();
  const { getTradeOperationHistory, tradeOperationWithHistory } =
    useTradeOperationHistory();
  const { getFollowingTradeOperations, followTradeOperation } =
    useFollowTradeOperations();

  const { id } = router.query;

  useEffect(() => {
    checkFullAccess();

    if (!user) {
      router.push('/sign-in');
    }
  }, []);

  useEffect(() => {
    if (id) {
      getTradeOperationHistory(id as string);
    }

    if (window.location.hash === '#seguir') {
      console.log('FOLLOW');
      console.log(id);
      followTradeOperation(id as string);
    }

    getFollowingTradeOperations();
  }, [id]);

  if (Object.keys(tradeOperationWithHistory).length === 0) return null;

  return (
    <div>
      {currentAccess.hasFullAccess ? (
        <div className="flex flex-col w-full items-center p-10">
          <p className="mb-10">STATUS ATUAL:</p>

          <TradeOperationCard
            tradeOperation={tradeOperationWithHistory.tradeOperation}
            editable={false}
          />

          <hr className="text-base m-10 w-full" />
          <p className="mb-10">HISTÓRICO:</p>
          <div className="flex flex-col-reverse md:flex-row-reverse flex-wrap justify-around">
            {tradeOperationWithHistory?.history?.map(tradeOperation => (
              <div className="m-4" key={tradeOperation.id}>
                <TradeOperationCard
                  tradeOperation={tradeOperation}
                  editable={false}
                  history
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoAccessCompnent />
      )}
    </div>
  );
};

export default OperationPage;
