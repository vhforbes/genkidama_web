import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';

import { useToast } from '../../hooks/toast';
import { useSubscription } from '../../hooks/subscription';

const SejaMembro: NextPage = () => {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const { checkSub, activateSubscription, cancelSubscription, subscription } =
    useSubscription();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [cancelReason, setCancelReason] = useState('');

  const router = useRouter();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        intent: 'subscription',
        vault: true,
      },
    });

    checkSub();
  }, []);

  if (!subscription) return null;

  if (subscription.status === 'ACTIVE')
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center md:mt-14 bg-secondary md:w-2/5 p-4 rounded-lg max-w-[500px]">
          <div className="flex flex-col items-center mt-6 md:w-[300px]">
            <p className="text-sm font-semibold self-start relative left-[5%]">
              MEMBRO
            </p>
            {theme === 'dark' ? (
              <img
                className="w-auto"
                alt="gnk text"
                src="/genkidama-text.png"
              />
            ) : (
              <img
                className="w-auto"
                alt="gnk text"
                src="/genkidama-text-black.png"
              />
            )}
          </div>

          <p className="mt-8 text-center text-xl w-4/5 font-bold">
            Você já é um membro Genkidama!
          </p>

          <div className="mt-4 text-center">
            <p className="p-10">
              Caso não esteja satisfeito com sua assinatura, basta cancelar
              inserindo o motivo e clicando no botão abaixo. Vamos sentir sua
              falta!
            </p>
            <textarea
              className="textarea md:w-[80%] w-full"
              placeholder="Motivo do cancelamento"
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
            />
            <br />
            <button
              type="button"
              className="btn btn-accent m-6"
              onClick={() =>
                cancelSubscription(
                  cancelReason,
                  subscription.paypal_subscription_id,
                )
              }
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );

  if (subscription.status !== 'ACTIVE')
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center md:mt-14 bg-secondary md:w-2/5 p-4 rounded-lg max-w-[500px]">
          <div className="flex flex-col items-center mt-6 md:w-[300px]">
            <p className="text-sm font-semibold self-start relative left-[5%]">
              MEMBRO
            </p>
            {theme === 'dark' ? (
              <img
                className="w-auto"
                alt="gnk text"
                src="/genkidama-text.png"
              />
            ) : (
              <img
                className="w-auto"
                alt="gnk text"
                src="/genkidama-text-black.png"
              />
            )}
          </div>

          <p className="mt-8 text-center text-xl w-4/5">
            Seja membro da plataforma Genkidama!
          </p>

          <div className="mt-4 text-center">
            <span className="text-xl  line-through">R$150,00</span>
            <span className="text-2xl font-semibold"> R$80,00 </span>
            <span>por mês!*</span>
            <p className="text-xs">
              *Preço promocional de lançamento da plataforma
            </p>
          </div>
          <div className="mt-6">
            <li>Conteúdos exclusivos</li>
            <li>Lives interativas</li>
            <li>Acesso à pool de investimentos</li>
            <li>Grupo exclusivo no telegram</li>
          </div>

          <div className="mt-10 mb-10 pl-8 pr-8 bg-[#fff] rounded-2xl max-w-sm z-0">
            <p className="text-slate900 text-center relative top-[20px]">
              Assine e cancele a qualquer momento através do PayPal:
            </p>
            <PayPalButtons
              className="mt-10"
              createSubscription={(data, actions) => {
                return actions.subscription
                  .create({
                    plan_id: 'P-55501210J8134335TMN5ZXXQ',
                  })
                  .then(orderId => {
                    console.log('INITIALIZED SUB');

                    return orderId;
                  });
              }}
              onApprove={async data => {
                activateSubscription(data);
              }}
              onCancel={async () => {
                addToast({
                  type: 'error',
                  title: 'Sua transação falhou',
                  description: 'Transação cancelada pelo usuário',
                });
              }}
              onError={async data => {
                addToast({
                  type: 'error',
                  title: 'Sua transação falhou',
                });
                console.error(data);
              }}
              style={{
                label: 'subscribe',
              }}
            />
          </div>
        </div>
      </div>
    );

  return null;
};

export default SejaMembro;
