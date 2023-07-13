import React, { useState } from 'react';
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

interface Props {
  value: number;
  currency?: boolean;
}

const CopyableValue: React.FC<Props> = ({ value, currency = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    const positiveValue = Math.abs(value);

    navigator.clipboard.writeText(positiveValue.toString());
    setCopied(true);
  };

  const formatUSD = (valueToFormat: number) => {
    const formatedValue = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      maximumFractionDigits: currency ? 2 : 6,
    }).format(valueToFormat);

    return formatedValue;
  };

  return (
    <div className="flex justify-between">
      <div className="mr-2">
        {currency ? (
          <span>${formatUSD(Math.abs(value))}</span>
        ) : (
          <span>{formatUSD(Math.abs(value))}</span>
        )}
      </div>

      <span className="flex-shrink-0" title="Copiar">
        <div className="relative">
          {!copied && (
            <ClipboardIcon
              className="h-5 w-4 cursor-pointer"
              onClick={handleCopyClick}
            />
          )}
          {copied && (
            <ClipboardDocumentCheckIcon
              className="h-5 w-4 cursor-pointer"
              onClick={handleCopyClick}
            />
          )}
        </div>
      </span>
    </div>
  );
};

export default CopyableValue;
