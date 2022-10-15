import { NextPage } from 'next';
import React from 'react';

const SignUp: NextPage = () => {
  return (
    <div className="hero mt-24">
      <div className="hero-content flex-col w-2/5">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100 dark:bg-primary">
          <div className="card-body">
            <div className="form-control">
              <span className="label">
                <span className="label-text">Email:</span>
              </span>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <span className="label">
                <span className="label-text">Senha:</span>
              </span>
              <input
                type="text"
                placeholder="senha"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <span className="label">
                <span className="label-text">Confirme sua senha:</span>
              </span>
              <input
                type="text"
                placeholder="senha"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button type="button" className="btn btn-secondary">
                Criar conta
              </button>
            </div>
          </div>
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
