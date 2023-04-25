import React from 'react';
import { TradeOperationsProvider } from './tradeOperations';
import { ActiveTradeOperationsProvider } from './activeTradeOperations';
import { AwaitingTradeOperationsProvider } from './awatingTradeOperations';
import { ClosedTradeOperationsProvider } from './closedTradeOperations';
import { TradeOperationHistorysProvider } from './tradeOperationHistory';
import { FollowingTradeOperationsProvider } from './followingTradeOperations';

const GeneralTradeOperationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <TradeOperationsProvider>
    <ActiveTradeOperationsProvider>
      <AwaitingTradeOperationsProvider>
        <ClosedTradeOperationsProvider>
          <TradeOperationHistorysProvider>
            <FollowingTradeOperationsProvider>
              {children}
            </FollowingTradeOperationsProvider>
          </TradeOperationHistorysProvider>
        </ClosedTradeOperationsProvider>
      </AwaitingTradeOperationsProvider>
    </ActiveTradeOperationsProvider>
  </TradeOperationsProvider>
);

export default GeneralTradeOperationsProvider;
