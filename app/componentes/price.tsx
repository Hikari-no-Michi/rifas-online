import React from 'react';

interface Theme {
  selectedTheme: 'claro' | 'escuro';
  claro: {
    corFundo: string;
    corTexto: string;
    svgColors: string;
  };
  escuro: {
    corFundo: string;
    corTexto: string;
    svgColors: string;
  };
}

interface PriceAppProps {
  price: number;
  tituloPrimeiro: string;
  tituloSegundo: string;
  theme: Theme;
}

export default function PriceApp({
  price,
  tituloPrimeiro,
  tituloSegundo,
  theme,
}: PriceAppProps) {
  return (
    <div className="mt-4 w-[98%] md:w-[60%] lg:w-[50%]">
      {/* Preço */}
      <p className={`text-left ${theme[theme.selectedTheme].corTexto}`}>
        Por apenas:
      </p>
      <p
        className={`text-left text-4xl font-medium ${
          theme[theme.selectedTheme].corTexto
        }`}
      >
        {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>

      {/* Botões de escolha */}
      <div className="mt-4 flex w-full space-x-1">
        <button
          className={`flex w-1/2 items-center justify-center  p-2 text-center font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none active:scale-95  active:shadow-inner
          ${
            theme.selectedTheme === 'claro'
              ? 'bg-pink-500 text-white'
              : 'bg-green-600 text-white'
          }
          `}
        >
          {tituloPrimeiro}
        </button>
        <button
          className={`flex w-1/2 items-center justify-center  p-2 text-center font-semibold transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none active:scale-95  active:shadow-inner
          ${
            theme.selectedTheme === 'claro'
              ? 'bg-orange-400 text-white'
              : 'bg-yellow-500'
          }
          `}
        >
          {/* Ícone de medalha */}

          {tituloSegundo}
        </button>
      </div>

      {/* Texto de orientação */}
      <p className={`m-5 text-center ${theme[theme.selectedTheme].corTexto}`}>
        Selecione a quantidade de números
      </p>
    </div>
  );
}
