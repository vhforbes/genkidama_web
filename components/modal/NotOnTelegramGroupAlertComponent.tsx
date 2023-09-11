/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

interface Props {
  id: string;
}

const NotOnTelegramGroupAlert = ({ id }: Props) => {
  const [checkedModal, setCheckedModal] = useState(true);

  return (
    <div className="relative mr-2">
      {/* The button to open modal */}
      <button type="button" className="min-h-0 h-8 w-5 p-0">
        <label htmlFor={`my-modal-${id}`} className="">
          {/* <PresentationChartLineIcon className="w-5 cursor-pointer" /> */}
        </label>
      </button>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        checked={checkedModal}
        id={`my-modal-${id}`}
        className="modal-toggle"
      />
      <label htmlFor={`my-modal-${id}`} className="modal cursor-pointer w-full">
        <label
          className="modal-box relative max-w-none w-full md:w-2/3 text-center"
          htmlFor=""
        >
          <label
            htmlFor={`my-modal-${id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setCheckedModal(false)}
          >
            ✕
          </label>

          <h1 className="text-2xl">Você ainda não está no Grupo!</h1>
          <br />
          <p>
            Fale com o{' '}
            <a
              className="hover:text-lightTeal underline"
              href="https://t.me/MestreKamee_bot"
              target="_blank"
              rel="noreferrer"
            >
              Mestre Kame
            </a>{' '}
            para entrar e receber atualizações personalizadas no seu telegram,
            conhecer pessoas da comunidade e ter acesso imediato a todo nosso
            conteúdo
          </p>
          <br />
          <h1 className="text-xl">Te esperamos lá Kakaroto!</h1>
          <br />
          <p className="text-xs">
            Caso já esteja no grupo, avise o{' '}
            <a
              className="hover:text-lightTeal underline"
              target="_blank"
              rel="noreferrer"
              href="https://t.me/vhforbes"
            >
              @vhforbes
            </a>
          </p>
        </label>
      </label>
    </div>
  );
};

export default NotOnTelegramGroupAlert;
