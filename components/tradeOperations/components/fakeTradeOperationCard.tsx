import React from 'react';

const FakeTradeOperationCard = () => (
  <div>
    <div className="absolute z-20 text-center mt-24 ml-10 bg-primary p-4 rounded-lg shadow-md">
      <p>
        Puts, me parece que essa <br /> operação está cheia...
      </p>
      <p className="mt-2">
        Pela seua segurança e do <br /> sinal, fique de fora.
      </p>
    </div>
    <div
      className={`card w-72  ${'bg-base-200 border-2 border-primary text-secondary'} text-primary-content mb-10 shadow-xl text-sm ${'blur select-none'}`}
    >
      <div className="card-body p-6 flex min-h-[380px]">
        {/* OBSERVATION GRAY */}
        <div className="text-sm dark:bg-gray p-2 rounded-md mb-2">
          <p>Atualizada em: qualquer coisa</p>
          {/* {observation ? (
          <p className="break-words w-fit">Obs: </p>
        ) : null} */}
        </div>

        <div className="flex flex-row justify-between">
          {/* LEFT ROW */}
          <div className="leftRow flex flex-col justify-between mr-4">
            <div className="mb-2 w-fit flex flex-col">
              <div className="flex">FAKEOP</div>
              <div className="self-end flex">
                <span className="">NODIR</span>
              </div>
            </div>

            <p className="mb-4 w-full">
              Status: <span className="font-bold">NONE</span>
            </p>

            <div className="mb-8">
              <span>Seguidores:</span>
              <span className="font-bold"> NONE</span>
            </div>
          </div>

          {/* RIGHT ROW */}
          <div className="rightRow flex flex-col justify-between min-h-[14em]">
            <div className="ordens w-full">
              <p className="font-bold">Ordens:</p>
              <div>
                <p>12345</p>
                <p>12345</p>
                <p>12345</p>
              </div>
            </div>

            <div className="stop w-full">
              <p className="font-bold">
                Stop: <span className="font-normal">X%</span>
              </p>
              <p>12345</p>
            </div>

            <div className="take-profit w-full flex flex-row md:flex-col justify-between">
              <div>
                <p className="font-bold">Take profit:</p>
                <div>
                  <p>12345</p>
                  <p>12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-2 text-sm">Criada em: </p>
      </div>
    </div>
  </div>
);

export default FakeTradeOperationCard;
