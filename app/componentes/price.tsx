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
  theme: Theme;
  description: string;
}

export default function PriceApp({
  price,
  theme,
  description,
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

      {/* Descrição do Sorteio com Label no topo e Maiúsculo */}
      <div
        className={`mt-4 py-3 px-4 text-center rounded-lg bg-[#364153] text-white`}
      >
        <label className="block text-xl font-semibold text-uppercase mb-3 text-slate-200">
          Descrição do Sorteio
        </label>
        <p className="py-4 break-words text-slate-200">{description}</p>
      </div>

      {/* Texto de orientação com Padding */}
      <p
        className={`m-5 text-center ${theme[theme.selectedTheme].corTexto}`}
      >
        Selecione a quantidade de números, quanto mais pontos você comprar mais
        chances de ganhar!
      </p>
    </div>
  );
}
