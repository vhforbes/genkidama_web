import React from 'react';
import { useToast } from '../../hooks/toast';
import ErrorSvg from '../../icons/misc/error';
import InfoSvg from '../../icons/misc/info';
import SuccessSvg from '../../icons/misc/success';
import WarningSvg from '../../icons/misc/warning';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ToastComponentProps {
  messages: ToastMessage[];
}

const ToastComponent: React.FC<ToastComponentProps> = () => {
  const { messages, removeToast } = useToast();

  console.log(messages);

  const svgType = (type?: string) => {
    switch (type) {
      case 'success':
        return <SuccessSvg />;
        break;
      case 'error':
        return <ErrorSvg />;
        break;
      case 'info':
        return <InfoSvg />;
        break;
      case 'warning':
        return <WarningSvg />;
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <div className="w-auto absolute top-24 right-10">
      {messages.map(message => (
        <div
          key={message.id}
          className={`alert alert-${message.type} shadow-lg mb-4`}
        >
          <div>
            {svgType(message.type)}
            <div>
              <h3 className="font-bold">{message.title}</h3>
              <div className="text-xs">{message.description}</div>
            </div>
          </div>
          <div className="flex-none">
            <button
              type="button"
              className="btn bg-transparent relative border-0 text-neutral btn-sm bottom-3 left-3
              hover:bg-transparent hover:text-"
              onClick={() => removeToast(message.id)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastComponent;
