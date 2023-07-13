import React from 'react';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';

interface Props {
  id: string;
  imageLink?: string;
}

const TradingViewModal = ({ imageLink, id }: Props) => {
  if (imageLink)
    return (
      <div className="relative mr-2">
        {/* The button to open modal */}
        <button type="button" className="min-h-0 h-8 w-5 p-0">
          <label htmlFor={`my-modal-${id}`} className="">
            <PresentationChartLineIcon className="w-5 cursor-pointer" />
          </label>
        </button>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id={`my-modal-${id}`} className="modal-toggle" />
        <label
          htmlFor={`my-modal-${id}`}
          className="modal cursor-pointer w-full"
        >
          <label
            className="modal-box relative max-w-none w-full md:w-2/3 text-center"
            htmlFor=""
          >
            <label
              htmlFor={`my-modal-${id}`}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <img className="mb-2" src={imageLink} alt="graph" />
            <a
              className="hover:text-lightTeal underline"
              href={imageLink}
              target="_blank"
              rel="noreferrer"
            >
              Abrir gráfico em nova aba.
            </a>
          </label>
        </label>
      </div>
    );

  return null;
};

export default TradingViewModal;
