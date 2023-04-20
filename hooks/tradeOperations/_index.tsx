import React from 'react';
import { TradeOperationsProvider } from './tradeOperations';
import { ActiveTradeOperationsProvider } from './activeTradeOperations';
import { AwaitingTradeOperationsProvider } from './awatingTradeOperations';
import { ClosedTradeOperationsProvider } from './closedTradeOperations';
import { TradeOperationHistorysProvider } from './tradeOperationHistory';

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
            {children}
          </TradeOperationHistorysProvider>
        </ClosedTradeOperationsProvider>
      </AwaitingTradeOperationsProvider>
    </ActiveTradeOperationsProvider>
  </TradeOperationsProvider>
);

export default GeneralTradeOperationsProvider;
