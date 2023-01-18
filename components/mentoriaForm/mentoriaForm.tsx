import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import MyTextInput from '../shared/textInput.component';
import { useToast } from '../../hooks/toast';
import { useLoader } from '../../hooks/loader';

interface SubmitMentoriaFormData {
  email: string;
}

const MentoriaForm = () => {
  const { addToast } = useToast();
  const { setLoading } = useLoader();

  const submit = async (
    { email }: SubmitMentoriaFormData,
    setSubmitting: (bool: boolean) => void,
  ) => {
    try {
      setLoading(true);
      console.log(email);
      //   await signIn({
      //     email,
      //     password,
      //   });
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
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MentoriaForm;
