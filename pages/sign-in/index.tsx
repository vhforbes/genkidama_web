import React from 'react';
import * as Yup from 'yup';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { AxiosError } from 'axios';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import MyTextInput from '../../components/shared/textInput.component';
import { useLoader } from '../../hooks/loader';
import { ErrorResponse } from '../../interfaces/ErrorResponse';

interface SubmitLoginData {
  email: string;
  password: string;
}
const SignIn: NextPage = () => {
  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const router = useRouter();

  if (user) {
    router.push('/');
    return null;
  }

  const submit = async (
    { email, password }: SubmitLoginData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      setLoading(true);
      await signIn({
        email,
        password,
      });

      setSubmitting(false);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title: 'Não foi possível submeter o formulário de login',
      });

      setSubmitting(false);
    }

    setLoading(false);
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Endereço de email inválido')
                .required('Campo obrigatório'),
              password: Yup.string().required('Campo obrigatório'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            <Form>
              <div className="card-body">
                <div className="form-control">
                  <MyTextInput
                    label="Email:"
                    name="email"
                    type="text"
                    placeholder="email@gmail.com"
                  />
                </div>
                <div className="form-control">
                  <MyTextInput
                    label="Senha:"
                    name="password"
                    type="password"
                    placeholder="senha"
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-secondary">
                    Login
                  </button>
                  <a
                    href="/users/reset"
                    className="link-hover text-center mt-6"
                  >
                    Esqueceu sua senha?
                  </a>
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

export default SignIn;
