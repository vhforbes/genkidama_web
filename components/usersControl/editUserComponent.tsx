/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { AxiosError } from 'axios';

import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';

import { ErrorResponse } from '../../interfaces/ErrorResponse';
import { User } from '../../interfaces/User';

import MyTextInput from '../shared/textInput.component';
import Checkbox from '../shared/checkbox.component';
import { useUsersControl } from '../../hooks/usersControl';

const EditUserComponent = ({ user }: { user: User }) => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const { updateUser } = useUsersControl();

  const submit = async (
    userDOT: User,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      await updateUser(userDOT);

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
                id: user.id || '',
                email: user.email || '',
                name: user.name || '',
                bitgetUID: user.bitgetUID || '',
                exchangePartner: user?.exchangePartner || '',
                // avatar: string || '',
                verified: user.verified || '',
                role: user.role || '',
                telegramId: user.telegramId || '',
                onTelegramGroup: user.onTelegramGroup || '',
                updated_at: user.updated_at || '',
                created_at: user.created_at || '',
              } as User
            }
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            <Form>
              <h1 className="text-center mt-4 text-xl">USER</h1>

              <div className="card-body flex flex-row flex-wrap">
                {/* ROW 1 */}
                <div className="w-fit">
                  <div className="form-control">
                    <MyTextInput
                      label="Nome:"
                      name="name"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Email:"
                      name="email"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      label="Bitget UID:"
                      name="bitgetUID"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="form-control">
                    <label htmlFor="direction" className="">
                      Role:
                    </label>
                    <Field
                      id="role"
                      name="role"
                      as="select"
                      className="input input-bordered w-full"
                    >
                      <option value=""> - </option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="BITGET">BITGET</option>
                      <option value="MEMBER">MEMBER</option>
                    </Field>
                    <div className="text-red">
                      <ErrorMessage name="direction" />
                    </div>
                  </div>
                </div>

                {/* ROW 2 */}
                <div className="w-fit">
                  <div className="form-control">
                    <MyTextInput
                      label="Telegram ID:"
                      name="telegramId"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      disabled
                      label="Criado em:"
                      name="created_at"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="form-control">
                    <MyTextInput
                      disabled
                      label="Atualizado em:"
                      name="updated_at"
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="w-44">
                    <div className="form-control">
                      <Checkbox
                        disabled
                        label="Email Verificado:"
                        name="verified"
                      />
                    </div>

                    <div className="form-control">
                      <Checkbox
                        disabled
                        label="Está no Grupo:"
                        name="onTelegramGroup"
                      />
                    </div>

                    <div className="form-control">
                      <Checkbox
                        label="Parceiro Bitget:"
                        name="exchangePartner"
                      />
                    </div>
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

export default EditUserComponent;
