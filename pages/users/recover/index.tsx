import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import routes from '../../../enums/routes';
import { useLoader } from '../../../hooks/loader';
import { useToast } from '../../../hooks/toast';
import publicApi from '../../../services/api';
import MyTextInput from '../../../components/shared/textInput.component';

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
      setLoading(false);
      setSubmitting(false);
      addToast({
        type: 'success',
        title: 'Você alterou sua senha com sucesso!',
        description: 'Faça login usando sua nova senha.',
      });
      router.push('/sign-in');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has ocurred',
        description: 'Could not recover password',
      });
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    setToken(router.query.token as string);

    if (!token) router.push('/sign-in');
  }, [router.isReady, router.query]);

  return (
    <main className="">
      <h1 className="text-center mt-20">Digite aqui sua nova senha</h1>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={Yup.object({
          password: Yup.string().required('Campo obrigatório'),
          confirmPassword: Yup.string().required('Campo obrigatório'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log('HEY');

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
    </main>
  );
};

export default RecoverPassword;
