import React from 'react';
import { TradeOperationsProvider } from './tradeOperations';
import { ActiveTradeOperationsProvider } from './activeTradeOperations';
import { AwaitingTradeOperationsProvider } from './awatingTradeOperations';
import { ClosedTradeOperationsProvider } from './closedTradeOperations';
import { TradeOperationHistorysProvider } from './tradeOperationHistory';
import { FollowingTradeOperationsProvider } from './followingTradeOperations';
import { TradingResumeProvider } from './tradeOperationsResume';

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
              <TradingResumeProvider>{children}</TradingResumeProvider>
            </FollowingTradeOperationsProvider>
          </TradeOperationHistorysProvider>
        </ClosedTradeOperationsProvider>
      </AwaitingTradeOperationsProvider>
    </ActiveTradeOperationsProvider>
  </TradeOperationsProvider>
);

export default GeneralTradeOperationsProvider;
