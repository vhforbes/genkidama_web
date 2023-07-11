import React from 'react';
import { CalculatorIcon } from '@heroicons/react/24/outline';
import SizeCalculator from './sizeCalculator.component';
import { TradeOperation } from '../../interfaces/TradeOperation';

interface Props {
  tradeOperation: TradeOperation;
}

const SizeCalculatorModal = ({ tradeOperation }: Props) => {
  return (
    <div className="relative mr-2">
      {/* The button to open modal */}
      <button type="button" className="min-h-0 h-8 w-5 p-0">
        <label
          htmlFor={`my-modal-${tradeOperation.id}-calculator`}
          className=""
        >
          <CalculatorIcon className="w-5 cursor-pointer" />
        </label>
      </button>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={`my-modal-${tradeOperation.id}-calculator`}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box relative max-w-none w-full md:w-fit h-full md:h-fit text-center">
          <label
            htmlFor={`my-modal-${tradeOperation.id}-calculator`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <h1>Calculadora de posição GNK</h1>
            <div className="mt-24 md:mt-0">
              <SizeCalculator tradeOperation={tradeOperation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeCalculatorModal;
