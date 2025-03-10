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

interface PhotoAppProps {
  produtoName: string;
  drawDate: string;
  urlImagem: string;
  theme: Theme;
}

export default function PhotoApp({
  drawDate,
  urlImagem,
  produtoName,
  theme,
}: PhotoAppProps) {
  return (
    <>
      <p
        className={`flex items-center justify-center mb-3 ${
          theme[theme.selectedTheme].corTexto
        }`}
      >
        {produtoName}
      </p>
      <div
        className={`relative flex w-[98%] flex-col items-center md:w-[60%] lg:w-[50%] rounded-lg shadow-lg ${
          theme.selectedTheme === 'claro'
            ? 'shadow-gray-400' // Sombra clara no tema claro
            : 'shadow-gray-900' // Sombra escura no tema escuro
        }`}
      >
        <img
          src={urlImagem}
          alt={produtoName}
          className="w-full rounded-lg object-cover"
        />
        <div
          className={`absolute top-3 left-3 rounded p-2 text-xs font-bold ${
            theme.selectedTheme === 'claro'
              ? 'bg-[#FFC0CB] text-[#212529]' // Rosa claro no tema claro
              : 'bg-[#A9A9A9] text-[#FFFFFF]' // Cinza médio no tema escuro
          }`}
        >
          {drawDate}
        </div>

        <div
          className={`absolute bottom-[10px] left-3 w-auto animate-pulse rounded-lg p-1 text-center text-xs ${
            theme.selectedTheme === 'claro'
              ? 'bg-[#90EE90] text-[#212529]' // Verde claro no tema claro
              : 'bg-[#228B22] text-[#FFFFFF]' // Verde forte no tema escuro
          }`}
        >
          Corre que está acabando!
        </div>
      </div>
    </>
  );
}
