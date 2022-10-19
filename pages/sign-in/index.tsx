import React from 'react';
import { NextPage } from 'next';
import { FormikErrors, useFormik } from 'formik';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const SignIn: NextPage = () => {
  const { signIn } = useAuth();
  const { addToast } = useToast();

  // Se o usuario existir, precisamos redirecionar para outro lugar

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: ({ email }) => {
      const errors: FormikErrors<{ email: string }> = {};
      if (!email) {
        errors.email = 'Required custom';
      }

      return errors;
    },
    onSubmit: async ({ email, password }) => {
      try {
        await signIn({
          email,
          password,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'An error has ocurred',
          description: 'This is an error, please correct it',
        });
      }
    },
  });

  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <form onSubmit={formik.handleSubmit}>
            <div className="card-body">
              <div className="form-control">
                <span className="label">Email:</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <span>Senha:</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  minLength={3}
                  className="input input-bordered"
                />
                <a
                  href="/esqueci-minha-senha"
                  className="label-text-alt link link-hover mt-2"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-secondary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <h1 className="text-lg text-center">
          Ainda não tem conta?
          <br />
          <a href="/sign-up" className="link-hover">
            {' '}
            Crie agora a sua, clique aqui!
          </a>
        </h1>
      </div>
    </div>
  );
};

export default SignIn;
