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
import { useUsersControl } from '../../hooks/usersControl';
import { User } from '../../interfaces/User';
import DatePickerField from '../shared/datePicker.component';
import { subscriptionTypes } from '../../enums/subscriptionTypes';

const SubscriptionFormComponent = ({
  edit = false,
  subscription,
  user,
}: {
  edit?: boolean;
  subscription?: Subscription;
  user?: User;
}) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const { updateSubscription, createSubscription } = useUsersControl();

  const submit = async (
    subscriptionDOT: Subscription,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      if (edit) {
        await updateSubscription(subscriptionDOT);
      }

      if (!edit) {
        await createSubscription({
          email: user?.email,
          type: subscriptionDOT.type,
          current_period_end: subscriptionDOT.current_period_end,
          paypal_subscription_id: subscriptionDOT.paypal_subscription_id,
        } as Subscription);
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

  const oneYearFromNowDate = () => {
    const date = new Date();
    // Add one year to it
    date.setFullYear(date.getFullYear() + 1);
    // To create a timestamp in the format timestampz (Postgres style):
    const timestampz = date.toISOString();

    return timestampz;
  };

  const threeMonthsFromDate = () => {
    const date = new Date();
    // Add three months to it
    date.setMonth(date.getMonth() + 3);
    // To create a timestamp in the format timestampz (Postgres style):
    const timestampz = date.toISOString();

    return timestampz;
  };

  return (
    <div className="mt-8 max-w-xl m-auto">
      <div className="flex-col overflow-visible visible">
        <div className="shadow-xl bg-base-100 dark:bg-primary rounded-xl">
          <Formik
            enableReinitialize
            initialValues={
              {
                id: subscription?.id || '',
                status: subscription?.status || '',
                type: subscription?.type || '',
                paypal_subscription_id:
                  subscription?.paypal_subscription_id || '',
                plan_id: subscription?.plan_id || '',
                current_period_start: subscription?.current_period_start || '',
                current_period_end: subscription?.current_period_end || '',
                canceled_at: subscription?.canceled_at || '',
                cancelation_reason: subscription?.cancelation_reason || '',
              } as Subscription
            }
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {edit && (
                  <h1 className="text-center pt-4 text-xl">
                    EDITAR SUBSCRIPTION
                  </h1>
                )}
                {!edit && (
                  <h1 className="text-center mt-4 text-xl">
                    CRIAR SUBSCRIPTION
                  </h1>
                )}

                {user && <p className="text-center mt-2">{user.email}</p>}

                <div className="card-body flex flex-row flex-wrap justify-around">
                  {/* ROW 1 */}
                  <div className="w-fit">
                    <div className="form-control">
                      <label htmlFor="type" className="">
                        Status:
                      </label>
                      <Field
                        id="status"
                        name="status"
                        as="select"
                        className="input input-bordered w-full"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        {edit && <option value="CANCELED">CANCELED</option>}
                      </Field>
                      <div className="text-red">
                        <ErrorMessage name="direction" />
                      </div>
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
                        onChange={(event: any) => {
                          const newValue = event.currentTarget.value;
                          setFieldValue('type', newValue);

                          switch (newValue) {
                            case subscriptionTypes.vip:
                              setFieldValue('current_period_end', '');
                              break;
                            case subscriptionTypes.betaTester:
                              setFieldValue('current_period_end', '');
                              break;
                            case subscriptionTypes.paypal:
                              setFieldValue('current_period_end', '');
                              break;
                            case subscriptionTypes.yearly:
                              setFieldValue(
                                'current_period_end',
                                oneYearFromNowDate(),
                              );
                              break;
                            case subscriptionTypes.mentoria:
                              setFieldValue(
                                'current_period_end',
                                threeMonthsFromDate(),
                              );
                              break;
                            default:
                              setFieldValue('relatedField', '');
                          }
                        }}
                      >
                        <option value=""> - </option>
                        <option value={subscriptionTypes.vip}>VIP</option>
                        <option value={subscriptionTypes.betaTester}>
                          BETATESTER
                        </option>
                        <option value={subscriptionTypes.paypal}>PAYPAL</option>
                        <option value={subscriptionTypes.yearly}>YEARLY</option>
                        <option value={subscriptionTypes.mentoria}>
                          MENTORIA
                        </option>
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
                        label="Plan ID:"
                        name="plan_id"
                        type="text"
                        placeholder=""
                      />
                    </div>

                    <div className="form-control">
                      <DatePickerField
                        disabled
                        name="current_period_start"
                        label="Inicio:"
                      />
                    </div>

                    <div className="form-control">
                      <DatePickerField
                        disabled={values.type !== 'YEARLY'}
                        name="current_period_end"
                        label="Fim ou prox. cobrança:"
                      />
                    </div>
                  </div>
                </div>

                {values.status === 'CANCELED' && (
                  <div className="form-control px-8">
                    <label
                      className="text-center mb-2"
                      htmlFor="cancelation_reason"
                    >
                      Motivo cancelamento:
                    </label>
                    <Field
                      as="textarea"
                      id="cancelation_reason"
                      name="cancelation_reason"
                      className="input input-bordered w-full h-28"
                      placeholder="Enter cancellation reason..."
                    />
                    <div className="text-red">
                      <ErrorMessage name="cancelation_reason" />
                    </div>
                  </div>
                )}

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-secondary">
                    Enviar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFormComponent;
