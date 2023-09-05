import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import * as Yup from 'yup';
import React from 'react';
import MyTextInput from '../../components/shared/textInput.component';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useLoader } from '../../hooks/loader';

interface SubmitSignUpData {
  email: string;
  name: string;
  password: string;
  confirmedPassword: string;
  exchange: string;
  exchangeUID?: string;
}
const SignUp: NextPage = () => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();
  const { signUp } = useAuth();

  const submit = async (
    {
      email,
      password,
      confirmedPassword,
      name,
      exchangeUID,
      exchange,
    }: SubmitSignUpData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      // Method doesent exist i must create it
      setLoading(true);
      await signUp({
        email,
        name,
        password,
        confirmedPassword,
        exchange,
        exchangeUID,
      });
      addToast({
        type: 'success',
        title: 'Conta criada com sucesso!',
        description: 'Vá ao seu email para confirmar a criação',
      });
      setSubmitting(false);
      setLoading(false);
    } catch (error: any) {
      addToast({
        type: 'error',
        title: error.response.data.message,
      });
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <Formik
            initialValues={{
              email: '',
              name: '',
              password: '',
              confirmedPassword: '',
              exchange: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Endereço de email inválido')
                .required('Campo obrigatório'),
              name: Yup.string().required('Campo obrigatório'),
              password: Yup.string()
                .required('Campo obrigatório')
                .min(8, 'Mínimo de 8 digitos'),
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
                    placeholder="seuemail@gmail.com"
                  />
                </div>
                <div className="form-control">
                  <MyTextInput
                    label="Nome:"
                    name="name"
                    type="text"
                    placeholder="Seu Nome"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="direction" className="">
                    Exchange:
                  </label>
                  <Field
                    id="exchange"
                    name="exchange"
                    as="select"
                    className="input input-bordered w-full"
                  >
                    <option value=""> - </option>
                    <option value="BITGET">BITGET</option>
                    <option value="BYBIT">BYBIT</option>
                  </Field>
                  <div className="text-red">
                    <ErrorMessage name="direction" />
                  </div>
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Exchange UID:"
                    name="exchangeUID"
                    type="text"
                    placeholder="Seu UID na corretora:"
                  />
                </div>
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
                    label="Confirme sua senha:"
                    name="confirmedPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-secondary">
                    CRIAR CONTA
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
