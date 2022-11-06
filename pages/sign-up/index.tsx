import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import * as Yup from 'yup';
import React from 'react';
import MyTextInput from '../../components/textInput.component';
import { useToast } from '../../hooks/toast';

interface SubmitSignUpData {
  email: string;
  password: string;
  confirmedPassword: string;
}
const SignUp: NextPage = () => {
  const { addToast } = useToast();

  const submit = async (
    { email, password, confirmedPassword }: SubmitSignUpData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      // Method doesent exist i must create it
      await signUp({
        email,
        password,
        confirmedPassword,
      });
      setSubmitting(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has ocurred',
        description: 'This is an error, please correct it',
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <Formik
            initialValues={{ email: '', password: '', confirmedPassword: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Endereço de email inválido')
                .required('Campo obrigatório'),
              password: Yup.string().required('Campo obrigatório'),
              confirmedPassword: Yup.string().required('Campo obrigatório'),
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
                <div className="form-control">
                  <MyTextInput
                    label="Confirme sua senha:"
                    name="confirmedPassword"
                    type="confirmedPassword"
                    placeholder="Confirme sua senha"
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-secondary">
                    Login
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <h1 className="text-lg text-center">
          Já possui uma conta?
          <a href="/sign-in" className="link-hover">
            {' '}
            Clique aqui!
          </a>
        </h1>
      </div>
    </div>
  );
};

export default SignUp;
