import React, { useState } from 'react';
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

interface Props {
  value: number;
}

const CopyableValue: React.FC<Props> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value.toString());
    setCopied(true);
  };

  const formatUSD = (valueToFormat: number) => {
    const formatedValue = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      maximumFractionDigits: 6,
    }).format(valueToFormat);

    return formatedValue;
  };

  return (
    <div className="flex justify-between">
      <span>${formatUSD(value)}</span>
      <span className="flex-shrink-0">
        <div className="relative">
          {!copied && (
            <ClipboardIcon
              className="h-5 w-5 cursor-pointer"
              onClick={handleCopyClick}
            />
          )}
          {copied && (
            <ClipboardDocumentCheckIcon
              className="h-5 w-5 cursor-pointer"
              onClick={handleCopyClick}
            />
          )}
        </div>
      </span>
    </div>
  );
};

export default CopyableValue;
