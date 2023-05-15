/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import * as Yup from 'yup';

import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';
import { useTradeOperations } from '../../hooks/tradeOperations/tradeOperations';

import MyTextInput from '../shared/textInput.component';

import { TradeOperation } from '../../interfaces/TradeOperation';
import { ErrorResponse } from '../../interfaces/ErrorResponse';

const TradeOperationForm = ({
  edit,
  create,
}: {
  edit?: boolean;
  create?: boolean;
}) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const {
    tradeOperations,
    // getTradeOperations,
    createTradeOperation,
    editTradeOperation,
  } = useTradeOperations();
  const router = useRouter();
  const [tradeOperation, setTradeOperation] = useState<TradeOperation>();

  useEffect(() => {
    // getTradeOperations();
  }, []);

  useEffect(() => {
    const { operationId } = router.query;

    tradeOperations.forEach(operation => {
      if (operation.id === operationId) {
        setTradeOperation(operation);
      }
    });
  }, [tradeOperations]);

  const submit = async (
    tradeOperationDOT: TradeOperation,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      if (edit) {
        editTradeOperation(tradeOperationDOT);
      }

      if (create) {
        createTradeOperation(tradeOperationDOT);
      }

      setSubmitting(false);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possivel submeter o formulário',
      });
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col">
        <div className="card shadow-xl bg-base-100 dark:bg-primary">
          <Formik
            enableReinitialize
            initialValues={
              {
                id: tradeOperation?.id || '',
                authorId: tradeOperation?.authorId || '',
                market: tradeOperation?.market || '',
                status: tradeOperation?.status || 'aguardando',
                direction: tradeOperation?.direction || '',
                maxFollowers: tradeOperation?.maxFollowers || 30,
                tradingViewLink: tradeOperation?.tradingViewLink || '',

                entryOrderOne: tradeOperation?.entryOrderOne || '',
                entryOrderTwo: tradeOperation?.entryOrderTwo || '',
                entryOrderThree: tradeOperation?.entryOrderThree || '',
                takeProfitOne: tradeOperation?.takeProfitOne || '',
                takeProfitTwo: tradeOperation?.takeProfitTwo || '',
                stop: tradeOperation?.stop || '',

                result: tradeOperation?.result || '',
                percentual: tradeOperation?.percentual || '',
                observation: tradeOperation?.observation || '',
              } as TradeOperation
            }
            validationSchema={Yup.object({
              market: Yup.string().required('Campo obrigatório'),
              direction: Yup.string().required('Campo obrigatório'),
              entryOrderOne: Yup.string().required('Campo obrigatório'),
              takeProfitOne: Yup.string().required('Campo obrigatório'),
              stop: Yup.string().required('Campo obrigatório'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            <Form>
              <div className="card-body flex flex-row flex-wrap">
                {/* INFOS */}
                <div className="w-fit">
                  <div className="form-control">
                    <MyTextInput
                      label="Market:"
                      name="market"
                      type="text"
                      placeholder="BTCUSDT"
                      mask="**********"
                    />
                  </div>

                  <div className="form-control">
                    <label htmlFor="status" className="">
                      Status da operação:
                    </label>
                    <Field
                      id="status"
                      name="status"
                      as="select"
                      className="input input-bordered w-full"
                    >
                      <option value="aguardando">Aguardando</option>
                      <option value="ativa">Ativa</option>
                      <option value="fechada">Fechada</option>
                    </Field>
                  </div>

                  <div className="form-control">
                    <label htmlFor="direction" className="">
                      Direção:
                    </label>
                    <Field
                      id="direction"
                      name="direction"
                      as="select"
                      className="input input-bordered w-full"
                    >
                      <option value=""> - </option>
                      <option value="long">Long</option>
                      <option value="short">Short</option>
                    </Field>
                    <div className="text-red">
                      <ErrorMessage name="direction" />
                    </div>
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Seguidores:"
                      name="maxFollowers"
                      type="number"
                      placeholder="30"
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="TradingView Link:"
                      name="tradingViewLink"
                      type="text"
                      placeholder="link"
                    />
                  </div>
                </div>

                {/* ORDENS */}
                <div className="w-fit">
                  <div className="form-control">
                    <MyTextInput
                      label="Entry Order One:"
                      name="entryOrderOne"
                      type="text"
                      placeholder=""
                      currency
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Entry Order Two:"
                      name="entryOrderTwo"
                      type="text"
                      placeholder=""
                      currency
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Entry Order Three:"
                      name="entryOrderThree"
                      type="text"
                      placeholder=""
                      currency
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Take Profit One:"
                      name="takeProfitOne"
                      type="text"
                      placeholder=""
                      currency
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Take Profit Two:"
                      name="takeProfitTwo"
                      type="text"
                      placeholder=""
                      currency
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Stop:"
                      name="stop"
                      type="text"
                      placeholder=""
                      currency
                    />
                  </div>
                </div>

                {/* RESULTS */}

                <div className="w-fit">
                  <div className="form-control">
                    <label htmlFor="result" className="">
                      Resultado da operação:
                    </label>
                    <Field
                      id="result"
                      name="result"
                      as="select"
                      className="input input-bordered w-full"
                    >
                      <option value=""> - </option>
                      <option value="gain">gain</option>
                      <option value="loss">loss</option>
                      <option value="even">even</option>
                    </Field>
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Percentual:"
                      name="percentual"
                      type="text"
                      placeholder="XX"
                      percentual
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Distancia até stop (%):"
                      name="stopDistance"
                      type="text"
                      placeholder="XX"
                      percentual
                    />
                  </div>
                </div>
              </div>
              <div className="form-control px-8">
                <MyTextInput
                  label="Observação:"
                  name="observation"
                  type="text"
                  placeholder=""
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-secondary">
                  Enviar
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TradeOperationForm;
