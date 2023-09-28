import React, { useState } from 'react';
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import formatNumber from '../../../helpers/formatNumber';

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

  return (
    <div className="flex justify-between">
      <div className="mr-2">
        {currency ? (
          <span>${formatNumber(Math.abs(value))}</span>
        ) : (
          <span>{formatNumber(Math.abs(value))}</span>
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
