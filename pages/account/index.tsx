import { Form, Formik } from 'formik';
import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import MyTextInput from '../../components/shared/textInput.component';
import routes from '../../enums/routes';
import { useAuth } from '../../hooks/auth';
import { useLoader } from '../../hooks/loader';
import { useToast } from '../../hooks/toast';
import { User } from '../../interfaces/User';
import privateApi from '../../services/privateApi';
import { ErrorResponse } from '../../interfaces/ErrorResponse';

const Account: NextPage = () => {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  if (!user) {
    router.push('/sign-in');
    return null;
  }

  const submit = async (
    userDOT: User,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      await privateApi.put(`${routes.users}/updateFromToken`, userDOT);
      await refreshUser();

      addToast({
        type: 'success',
        title: 'Usuário atualizado',
        description: 'Você atualizou seu usuário com sucesso!',
      });
      setSubmitting(false);
    } catch (error: any) {
      const e: AxiosError<ErrorResponse> = error;

      addToast({
        type: 'error',
        description: e.response?.data.message,
        title:
          'Não foi possível enviar o formulário para atualizar seu usuário',
      });
      setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <h1 className="text-center mt-8 text-lg font-bold">
            Olá {user?.name}!
          </h1>
          <p className="text-center text-lg">Edite aqui suas informações:</p>
          <Formik
            enableReinitialize
            initialValues={
              {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                bitgetUID: user?.bitgetUID,
              } as User
            }
            onSubmit={(values, { setSubmitting }) => {
              submit(values, setSubmitting);
            }}
          >
            <Form>
              <div className="card-body">
                <div className="form-control">
                  <MyTextInput
                    label="Title:"
                    name="name"
                    type="text"
                    placeholder="Nome"
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Email:"
                    name="email"
                    type="text"
                    placeholder="Subtitulo"
                    disabled
                  />
                </div>

                <div className="form-control">
                  <MyTextInput
                    label="Bitget UID:"
                    name="bitgetUID"
                    type="text"
                    placeholder="Seu UID da Bitget"
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

export default Account;
