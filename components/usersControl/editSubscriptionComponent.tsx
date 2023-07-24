/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AxiosError } from 'axios';

import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';

import { ErrorResponse } from '../../interfaces/ErrorResponse';

import MyTextInput from '../shared/textInput.component';
import { Subscription } from '../../interfaces/Subscription';

const EditSubscriptionComponent = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const submit = async (
    subscriptionDOT: Subscription,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      console.log(subscriptionDOT);

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
    <div className="hero mt-8">
      <div className="hero-content flex-col">
        <div className="card shadow-xl bg-base-100 dark:bg-primary">
          <Formik
            enableReinitialize
            initialValues={
              {
                id: subscription.id,
                status: subscription.status,
                type: subscription.type,
                paypal_subscription_id: subscription.paypal_subscription_id,
                plan_id: subscription.plan_id,
                current_period_start: subscription.current_period_start,
                current_period_end: subscription.current_period_end,
                canceled_at: subscription.canceled_at,
                cancelation_reason: subscription.cancelation_reason,
              } as Subscription
            }
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            <Form>
              <h1 className="text-center mt-4 text-xl">SUBSCRIPTION</h1>
              <div className="card-body flex flex-row flex-wrap">
                {/* ROW 1 */}
                <div className="w-fit">
                  <div className="form-control">
                    <MyTextInput
                      label="Status:"
                      name="status"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="form-control">
                    <label htmlFor="type" className="">
                      Role:
                    </label>
                    <Field
                      id="type"
                      name="type"
                      as="select"
                      className="input input-bordered w-full"
                    >
                      <option value=""> - </option>
                      <option value="VIP">VIP</option>
                      <option value="BETATESTER">BETATESTER</option>
                      <option value="PAYPAL">PAYPAL</option>
                    </Field>
                    <div className="text-red">
                      <ErrorMessage name="direction" />
                    </div>
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Paypal ID:"
                      name="paypal_subscription_id"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* ROW 2 */}
                <div className="w-fit">
                  <div className="form-control">
                    <MyTextInput
                      disabled
                      label="Inicio:"
                      name="current_period_start"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      disabled
                      label="Fim:"
                      name="current_period_end"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
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

export default EditSubscriptionComponent;
