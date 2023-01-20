import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import MyTextInput from '../shared/textInput.component';
import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';

interface SubmitMentoriaFormData {
  full_name: string;
  email: string;
  phone_number: string;
  telegram_name: string;
  total_trading_time: string;
}

const MentoriaForm = () => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const submit = async (
    {
      full_name,
      email,
      phone_number,
      telegram_name,
      total_trading_time,
    }: SubmitMentoriaFormData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    console.log('submit');
    try {
      // setLoading(true);

      console.log(
        full_name,
        email,
        phone_number,
        telegram_name,
        total_trading_time,
      );

      setLoading(false);
      setSubmitting(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has ocurred',
        description: 'Could not login',
      });
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          full_name: '',
          email: '',
          phone_number: '',
          telegram_name: '',
          total_trading_time: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Endereço de email inválido')
            .required('Campo obrigatório'),
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
                name="full_name"
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
                name="phone_number"
                type="text"
                placeholder="(11)963835105"
              />
            </div>
            <div className="form-control mt-4">
              <MyTextInput
                label="Nome no Telegram:"
                name="telegram_name"
                type="text"
                placeholder="@JoaoSilva"
              />
            </div>
            <div className="form-control mt-4">
              <MyTextInput
                label="Opera a quanto tempo?"
                name="total_trading_time"
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
