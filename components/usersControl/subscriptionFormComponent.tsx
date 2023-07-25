/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { AxiosError } from 'axios';

import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';

import { ErrorResponse } from '../../interfaces/ErrorResponse';

import MyTextInput from '../shared/textInput.component';
import { Subscription } from '../../interfaces/Subscription';
import { useUsersControl } from '../../hooks/usersControl';
import { User } from '../../interfaces/User';
import DatePickerField from '../shared/datePicker.component';
import { time } from 'console';

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
        await createSubscription(subscriptionDOT);
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
                            case 'VIP':
                              setFieldValue('current_period_end', '');
                              break;
                            case 'BETATESTER':
                              setFieldValue('current_period_end', '');
                              break;
                            case 'PAYPAL':
                              setFieldValue('current_period_end', '');
                              break;
                            case 'YEARLY':
                              setFieldValue(
                                'current_period_end',
                                oneYearFromNowDate(),
                              );
                              break;
                            default:
                              setFieldValue('relatedField', '');
                          }
                        }}
                      >
                        <option value=""> - </option>
                        <option value="VIP">VIP</option>
                        <option value="BETATESTER">BETATESTER</option>
                        <option value="PAYPAL">PAYPAL</option>
                        <option value="YEARLY">YEARLY</option>
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

                      {/* <MyTextInput
                        disabled={values.type !== 'YEARLY'}
                        label="Fim ou prox. cobrança:"
                        name="current_period_end"
                        type="text"
                        placeholder=""
                      /> */}
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
