import React, { useState } from 'react';

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
      <svg
        onClick={handleCopyClick}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {copied ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        )}
      </svg>
    </div>
  );
};

export default CopyableValue;
