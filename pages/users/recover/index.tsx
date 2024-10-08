import { Form, Formik } from 'formik';
import { AxiosError } from 'axios';
import * as Yup from 'yup';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import routes from '../../../enums/routes';
import { useLoader } from '../../../hooks/loader';
import { useToast } from '../../../hooks/toast';
import publicApi from '../../../services/api';
import MyTextInput from '../../../components/shared/textInput.component';
import { ErrorResponse } from '../../../interfaces/ErrorResponse';

interface SubmitRcoverPasswordData {
  token: string;
  password: string;
}

const RecoverPassword: NextPage = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const [token, setToken] = useState('');

  const submit = async (
    { password }: SubmitRcoverPasswordData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      setLoading(true);
      await publicApi.put(routes.recoverPassword, {
        token,
        newPassword: password,
      });
      setSubmitting(false);
      addToast({
        type: 'success',
        title: 'Você alterou sua senha com sucesso!',
        description: 'Faça login usando sua nova senha.',
      });
      router.push('/sign-in');
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível alterar sua senha',
      });

      setSubmitting(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;

    setToken(router.query.token as string);

    if (!router.query.token) router.push('/sign-in');
  }, [router.isReady, router.query]);

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <p className="text-center mt-8 p-2 text-xl">
            Digite aqui sua nova senha:
          </p>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              password: Yup.string().required('Campo obrigatório'),
              confirmPassword: Yup.string().required('Campo obrigatório'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const { password, confirmPassword } = values;

              if (password !== confirmPassword) {
                addToast({
                  type: 'error',
                  title: 'As senhas não são iguais',
                  description: 'Verifique sua senha e tente novamente.',
                });
                return;
              }

              submit({ password, token }, setSubmitting);
            }}
          >
            <Form>
              <div className="card-body">
                <div className="form-control">
                  <MyTextInput
                    label="Senha:"
                    name="password"
                    type="password"
                    placeholder="Senha"
                  />
                </div>
                <div className="form-control">
                  <MyTextInput
                    label="Confirme a Senha:"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirme a senha"
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
      </div>
    </div>
  );
};

export default RecoverPassword;
