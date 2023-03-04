import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import routes from '../../../enums/routes';
import { useLoader } from '../../../hooks/loader';
import { useToast } from '../../../hooks/toast';
import MyTextInput from '../../../components/shared/textInput.component';
import privateApi from '../../../services/privateApi';

interface SumitResetPasswordData {
  email: string;
}

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const submit = async (
    { email }: SumitResetPasswordData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      setLoading(true);
      await privateApi.post(routes.recoverPassword, {
        email,
      });
      setLoading(false);
      setSubmitting(false);
      addToast({
        type: 'success',
        title: 'Um email foi enviado para você!',
        description: 'Clique no link enviado para recuperar sua senha.',
      });
      router.push('/sign-in');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has ocurred',
        description: 'Could not reset password',
      });
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <h1 className="text-center mt-8 text-xl p-2">
            Caso você tenha conta, um email será enviado para redefinir sua
            senha.
          </h1>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email().required('Campo obrigatório'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const { email } = values;

              submit({ email }, setSubmitting);
            }}
          >
            <Form>
              <div className="card-body">
                <div className="form-control">
                  <MyTextInput
                    label="Digite seu email:"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
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

export default ResetPassword;
