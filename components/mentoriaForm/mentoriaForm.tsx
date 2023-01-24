import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';

import MyTextInput from '../shared/textInput.component';
import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';
import publicApi from '../../services/api';
import routes from '../../enums/routes';

interface SubmitMentoriaFormData {
  name: string;
  email: string;
  phoneNumber: string;
  telegramName: string;
  totalTradingTime: string;
}

const MentoriaForm = () => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const submit = async (
    {
      name,
      email,
      phoneNumber,
      telegramName,
      totalTradingTime,
    }: SubmitMentoriaFormData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      setLoading(true);

      await publicApi.post(routes.forms.mentoria, {
        name,
        email,
        phoneNumber,
        telegramName,
        totalTradingTime,
      });

      addToast({
        type: 'success',
        title: 'Obrigado pelo interesse!',
        description: 'Em breve entraremos em contato.',
      });
      setLoading(false);
      setSubmitting(false);
    } catch (error: AxiosError | any) {
      addToast({
        type: 'error',
        title: 'An error has ocurred',
        description: error?.response.data.message || 'Unknown error',
      });
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          telegramName: '',
          totalTradingTime: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Endereço de email inválido')
            .required('Campo obrigatório'),
          name: Yup.string().required('Campo obrigatório'),
          phoneNumber: Yup.string().required('Campo obrigatório'),
          telegramName: Yup.string().required('Campo obrigatório'),
          totalTradingTime: Yup.string().required('Campo obrigatório'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          submit(values, setSubmitting);
        }}
      >
        <Form>
          <div className="">
            <div className="form-control mt-4">
              <MyTextInput
                label="Nome completo:"
                name="name"
                type="text"
                placeholder="João Silva"
              />
            </div>
            <div className="form-control mt-4">
              <MyTextInput
                label="Email:"
                name="email"
                type="text"
                placeholder="joaosilva@email.com"
              />
            </div>
            <div className="form-control mt-4">
              <MyTextInput
                label="Numero do whatsapp:"
                name="phoneNumber"
                type="text"
                mask="(99)99999-9999"
                placeholder="(11)96383-5105"
              />
            </div>
            <div className="form-control mt-4">
              <MyTextInput
                label="Nome no Telegram:"
                name="telegramName"
                type="text"
                mask="@aaaaaaaaaaaaaaaaaa"
                placeholder="@JoaoSilva"
              />
            </div>
            <div className="form-control mt-4">
              <MyTextInput
                label="Opera a quanto tempo?"
                name="totalTradingTime"
                type="text"
                placeholder="1 ano, 1 mês.."
              />
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-secondary">
                ENVIAR
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MentoriaForm;
