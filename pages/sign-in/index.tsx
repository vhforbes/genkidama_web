import { NextPage } from 'next';
import React from 'react';

const SignIn: NextPage = () => {
  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-auto md:w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <div className="card-body">
            <div className="form-control">
              <span className="label">Email:</span>
              <input
                type="text"
                id="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <span>Senha:</span>
              <input
                type="text"
                placeholder="senha"
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
              <button type="button" className="btn btn-secondary">
                Login
              </button>
            </div>
          </div>
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
