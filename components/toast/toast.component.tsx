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

  const setToastType = (type?: string) => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'info':
        return 'alert-info';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert';
    }
  };

  const svgType = (type?: string) => {
    switch (type) {
      case 'success':
        return <SuccessSvg />;
      case 'error':
        return <ErrorSvg />;
      case 'info':
        return <InfoSvg />;
      case 'warning':
        return <WarningSvg />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed right-4 mt-6 z-10">
      <div className="">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex flex-row alert shadow-lg mb-4 ${setToastType(
              message.type,
            )}`}
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
    </div>
  );
};

export default ToastComponent;
