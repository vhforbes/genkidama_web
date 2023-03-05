/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

import { useToast } from '../../hooks/toast';

import { useLoader } from '../../hooks/loader';
import MyTextInput from '../shared/textInput.component';
import { TradeOperation } from '../../interfaces/tradeOperation';
import privateApi from '../../services/privateApi';
import routes from '../../enums/routes';

const TradeOperationForm = (tradeOperation: TradeOperation) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const {
    id,
    author_id,
    active,
    market,
    created_at,
    updated_at,
    direction,
    entry_order_one,
    entry_order_two,
    entry_order_three,
    take_profit_one,
    take_profit_two,
    stop,
    result,
  } = tradeOperation;

  const submit = async (
    tradeOperationDOT: TradeOperation,
    setSubmitting: (bool: boolean) => void,
  ) => {
    console.log(tradeOperationDOT);

    try {
      setLoading(true);

      // await privateApi.post(routes.tradeOperations, tradeOperationDOT);

      setLoading(false);
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
            initialValues={{
              id,
              author_id,
              active,
              market,
              created_at,
              updated_at,
              direction,
              entry_order_one,
              entry_order_two,
              entry_order_three,
              take_profit_one,
              take_profit_two,
              stop,
              result,
            }}
            // validationSchema={Yup.object({
            //   email: Yup.string()
            //     .email('Endereço de email inválido')
            //     .required('Campo obrigatório'),
            //   password: Yup.string().required('Campo obrigatório'),
            // })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
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
                    placeholder="BTC/USDT"
                  />
                </div>

                <div className="form-control">
                  <label>
                    Active:
                    <Field type="checkbox" name="active" />
                  </label>
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
                    name="entry_order_one"
                    type="text"
                    placeholder=""
                    currency
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Entry Order Two:"
                    name="entry_order_two"
                    type="text"
                    placeholder=""
                    currency
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Entry Order Three:"
                    name="entry_order_three"
                    type="text"
                    placeholder=""
                    currency
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Take Profit One:"
                    name="take_profit_one"
                    type="text"
                    placeholder=""
                    currency
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Take Profit Two:"
                    name="take_profit_two"
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
                    label="Stop:"
                    name="stop"
                    type="text"
                    placeholder="GAIN / LOSS"
                    currency
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
