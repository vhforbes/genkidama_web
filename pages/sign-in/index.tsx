import React from 'react';
import { NextPage } from 'next';
import { useFormik } from 'formik';
import { useAuth } from '../../context/AuthContext';

const SignIn: NextPage = () => {
  const { signIn } = useAuth();

  // Se o usuario existir, precisamos redirecionar para outro lugar

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      // Call context to make api call
      signIn({
        email,
        password,
      });
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
