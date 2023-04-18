import React from 'react';
import { TradeOperationsProvider } from './tradeOperations';
import { ActiveTradeOperationsProvider } from './activeTradeOperations';
import { AwaitingTradeOperationsProvider } from './awatingTradeOperations';
import { ClosedTradeOperationsProvider } from './closedTradeOperations';

const GeneralTradeOperationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <TradeOperationsProvider>
    <ActiveTradeOperationsProvider>
      <AwaitingTradeOperationsProvider>
        <ClosedTradeOperationsProvider>
          {children}
        </ClosedTradeOperationsProvider>
      </AwaitingTradeOperationsProvider>
    </ActiveTradeOperationsProvider>
  </TradeOperationsProvider>
);

export default GeneralTradeOperationsProvider;
