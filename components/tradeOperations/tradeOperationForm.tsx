/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { useRouter } from 'next/router';
import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';
import { useTradeOperations } from '../../hooks/tradeOperations/tradeOperations';

import MyTextInput from '../shared/textInput.component';

import { TradeOperation } from '../../interfaces/TradeOperation';

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
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has ocurred',
        description: 'Could not edit trade operation',
      });
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <Formik
            enableReinitialize
            initialValues={
              {
                id: tradeOperation?.id || '',
                authorId: tradeOperation?.authorId || '',
                market: tradeOperation?.market || '',
                status: tradeOperation?.status || 'ativa',
                direction: tradeOperation?.direction || '',
                entryOrderOne: tradeOperation?.entryOrderOne || '',
                entryOrderTwo: tradeOperation?.entryOrderTwo || '',
                entryOrderThree: tradeOperation?.entryOrderThree || '',
                takeProfitOne: tradeOperation?.takeProfitOne || '',
                takeProfitTwo: tradeOperation?.takeProfitTwo || '',
                stop: tradeOperation?.stop || '',
                result: tradeOperation?.result || '',
                observation: tradeOperation?.observation || '',
              } as TradeOperation
            }
            // validationSchema={Yup.object({
            //   email: Yup.string()
            //     .email('Endereço de email inválido')
            //     .required('Campo obrigatório'),
            //   password: Yup.string().required('Campo obrigatório'),
            // })}
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            <Form>
              <div className="card-body">
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
                  <MyTextInput
                    label="Observação:"
                    name="observation"
                    type="text"
                    placeholder=""
                  />
                </div>

                <div className="w-48">
                  <label
                    htmlFor="fruits"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select a fruit:
                  </label>
                  <Field
                    id="fruits"
                    name="fruits"
                    as="select"
                    className="input input-bordered"
                  >
                    <option value="">Status da operação:</option>
                    <option value="aguardando">Aguardando</option>
                    <option value="ativa">Ativa</option>
                    <option value="fechada">Fechada</option>
                  </Field>
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Direction:"
                    name="direction"
                    type="text"
                    placeholder="short / long"
                  />
                </div>

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

                <div className="form-control">
                  <MyTextInput
                    label="Result:"
                    name="result"
                    type="text"
                    placeholder="GAIN / LOSS"
                    mask="****"
                  />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-secondary">
                    Enviar
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <h1 className="text-lg text-center">
          Ainda não tem conta?
          <br />
          <a href="/sign-up" className="link-hover">
            {' '}
            Crie agora a sua, <i>clique aqui!</i>
          </a>
        </h1>
      </div>
    </div>
  );
};

export default TradeOperationForm;
