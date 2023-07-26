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
    <div className="hero md:mt-24">
      <div className="hero-content flex-col w-auto md:w-3/5">
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl">
            Seja bem-vindo à{' '}
            <span className="font-bold text-lightTeal">GENKIDAMA</span> a melhor
            comunidade de sinais e educação do criptomercado brasileiro.
          </h1>
        </div>

        <div className="youtube-video-container mt-4">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/zPvkBXeObP0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="card mt-4 flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
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
        <h1 className="text-2xl text-center">
          Ainda não tem conta?
          <br />
          <a
            href="/sign-up"
            className="link-hover hover:text-lightTeal font-bold"
          >
            {' '}
            Crie agora a sua, <i>clique aqui!</i>
          </a>
        </h1>
        {/* <div className=" flex flex-col mt-8">
          <span className="font-bold text-xl text-center">
            Aqui você encontra:
          </span>
          <ul
            className="text-left list-disc relative mt-4 m-auto
          "
          >
            <li>Mais de 8 horas de vídeos exclusívos.</li>
            <li>Sinais diários e educativos na plataforma e telegram.</li>
            <li>BOT inteligente que te atualiza com o status da operação.</li>
            <li>Uma comunidade de traders engajados e ativos.</li>
            <li>Lives e acesso direto a um trader com anos de experiência.</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
