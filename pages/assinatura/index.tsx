import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/auth';

import { useToast } from '../../hooks/toast';
import { useSubscription } from '../../hooks/subscription';
import roles from '../../enums/roles';
import pricing from '../../enums/pricing';

const SejaMembro: NextPage = () => {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const { activateSubscription, cancelSubscription, subscription } =
    useSubscription();
  const { user, refreshUser } = useAuth();
  const { theme } = useTheme();
  const { addToast } = useToast();
  const [cancelReason, setCancelReason] = useState('');

  // PRODUCTION
  const [planID, setPlanID] = useState('P-13968243Y69234712MR33BTQ');
  // DEVELOPMENT;
  // const [planID, setPlanID] = useState('P-4UM68146V4599473UMR66GGY');

  const router = useRouter();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  useEffect(() => {
    // GO TO HOME UNTIL RELEASE

    refreshUser();

    if (user.role === 'BITGET') {
      // V2
      setPlanID('P-64F73262DA4253457MR33BKI');

      // V1
      // setPlanID('P-2RF01754NW371114VMRH3VAI');
    }

    if (user.role === 'EA') {
      // V2
      setPlanID('P-5E407350VB375000FMR36MPQ');

      // V1
      // setPlanID('P-3NX15147R0531871RMRH3VPA');
    }

    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        intent: 'subscription',
        vault: true,
      },
    });
  }, []);

  if (!user) return null;

  if (user.subscription?.status === 'ACTIVE')
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
            {cancelReason.length <= 20 ? (
              <p className="text-red">
                Por favor escreva o motivo do cancelamento para melhorarmos
                nosso serviço.
              </p>
            ) : null}
            <br />
            <button
              type="button"
              className="btn btn-accent m-6"
              disabled={!cancelReason || cancelReason.length <= 20}
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

  if (user.subscription?.status !== 'ACTIVE')
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

          {user.role === roles.bitget ? (
            <div>
              <div className="mt-4 text-center">
                <p className="text-xs">
                  Obrigado por ser um membro BITGET!
                  <br />
                  Aproveite seu desconto de:
                </p>
                <span className="text-xl  line-through">
                  R${pricing.fullPrice}
                </span>
                <span className="text-2xl font-semibold">
                  {' '}
                  R${pricing.bitgetAssociateAndSubscriber}{' '}
                </span>
                <span>por mês!</span>
              </div>
            </div>
          ) : null}

          {user.role === roles.earlyAdopter ? (
            <div>
              <div className="mt-4 text-center">
                <p className="text-xs">
                  Obrigado por ser um early adopter!
                  <br />
                  Aproveite seu desconto de:
                </p>
                <span className="text-xl  line-through">
                  R${pricing.fullPrice}
                </span>
                <span className="text-2xl font-semibold">
                  {' '}
                  R${pricing.earlyAdopterAndSubscriber}{' '}
                </span>
                <span>por mês!</span>
              </div>
            </div>
          ) : null}

          {user.role === roles.commom ? (
            <div>
              <div className="mt-4 text-center">
                <p className="text-xs">
                  Estamos felizes que você queira fazer parte da Genkidama!
                  Assine agora por:
                </p>

                <span className="text-2xl font-semibold">
                  {' '}
                  R${pricing.fullPrice}{' '}
                </span>
                <span>por mês!</span>
                <br />
                <br />

                <p>
                  Caso queira pagar apenas{' '}
                  <span className="text-lg">
                    R$
                    {pricing.bitgetAssociateAndSubscriber}
                  </span>{' '}
                  não deixe de virar um{' '}
                  <a
                    className="hover:text-lightTeal underline text-lg"
                    href="/parceiro-bitget"
                  >
                    parceiro bitget
                  </a>
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-10 mb-10 pl-8 pr-8 bg-[#fff] rounded-2xl max-w-sm z-0">
            <p className="text-slate900 text-center relative top-[20px]">
              Assine e cancele a qualquer momento através do PayPal:
            </p>
            <PayPalButtons
              className="mt-10"
              createSubscription={(data, actions) => {
                return actions.subscription
                  .create({
                    plan_id: planID,
                  })
                  .then(orderId => {
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
                // eslint-disable-next-line no-console
                console.error(data);
              }}
              style={{
                label: 'subscribe',
              }}
            />
          </div>

          {user.bitgetPartner ? (
            <div>
              <div className="mt-4 text-center">
                <p className="">
                  Obrigado por ser um membro{' '}
                  <span className="text-lightTeal font-bold">BITGET!</span>{' '}
                  Aproveite a chance de assinar o plano anual por apenas{' '}
                  <span className="text-xl">R$799,90</span>.
                </p>
                <br />
                <p>
                  Entre em contato com{' '}
                  <a
                    className="hover:text-green underline"
                    href="https://wa.me/5522998597277"
                    target="_blank"
                    rel="noreferrer"
                  >
                    nosso whatsapp
                  </a>{' '}
                  para fechar seu plano anual.
                </p>
              </div>
            </div>
          ) : null}
          {!user.bitgetPartner ? (
            <div>
              <div className="mt-4 text-center">
                <p className="">
                  Parce que você não é um membro{' '}
                  <span className="text-lightTeal font-bold">BITGET!</span>
                  <br />
                  Seja um{' '}
                  <a
                    className="hover:text-lightTeal underline"
                    href="/parceiro-bitget"
                  >
                    parceiro bitget
                  </a>{' '}
                  e proveite a chance de assinar o plano anual por apenas:
                  <br />
                  <br />
                  <span className="line-through">R$1399,90</span>{' '}
                  <span className="text-xl font-bold">R$799,90</span>.
                </p>
                <br />
                <p>
                  Entre em contato com{' '}
                  <a
                    className="hover:text-green underline"
                    href="https://wa.me/5522998597277"
                    target="_blank"
                    rel="noreferrer"
                  >
                    nosso whatsapp
                  </a>{' '}
                  para fechar seu plano anual.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );

  return null;
};

export default SejaMembro;
