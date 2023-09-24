import { useFormikContext } from 'formik';
import React from 'react';
import { TradeOperation } from '../../../interfaces/TradeOperation';
import { useToast } from '../../../hooks/toast';

const CopyToClipboardButton = () => {
  const formik = useFormikContext<TradeOperation>();

  const { addToast } = useToast(); // You may need to adjust how to use the toast, based on your application setup

  const copyToClipboard = () => {
    const formValues = formik.values;
    const jsonValues = JSON.stringify(formValues, null, 2);
    navigator.clipboard.writeText(jsonValues);
    addToast({
      type: 'success',
      title: 'Copied to Clipboard',
      description: 'Form values have been copied to the clipboard as JSON.',
    });
  };

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={copyToClipboard}
    >
      Copiar JSON
    </button>
  );
};

export default CopyToClipboardButton;
