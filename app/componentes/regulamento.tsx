import React, { useState } from 'react';

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

interface RegulamentoProps {
  unitValue: number;
  titulo: string;
  theme: Theme;
}

const Regulamento: React.FC<RegulamentoProps> = ({
  unitValue,
  titulo,
  theme,
}) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent((prev) => !prev);
  };

  return (
    <div
      className={`w-[98%] rounded-lg border-2 shadow-md transition-all md:w-[60%] lg:w-[50%] ${
        theme.selectedTheme === 'claro'
          ? 'bg-[#F8F9FA] border-[#FFC0CB]' // Fundo claro com borda rosa suave
          : 'bg-[#182238] border-[#2C3A4B]' // Fundo escuro com borda cinza
      }`}
    >
      <button
        className={`flex w-full items-center justify-between px-4 py-3 text-lg font-semibold uppercase transition-all ${
          theme.selectedTheme === 'claro'
            ? 'bg-[#FFC0CB] text-[#212529] hover:bg-[#FFB6C1]' // Botão rosa suave com hover mais claro
            : 'bg-[#2C3A4B] text-[#FFFFFF] hover:bg-[#3A4A5B]' // Botão cinza escuro com hover mais claro
        } focus:outline-none rounded-t-lg`}
        aria-expanded={showContent ? 'true' : 'false'}
        onClick={toggleContent}
      >
        <span className="w-full text-center">Regulamento / Descrição</span>
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${
            showContent ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          fill={theme.selectedTheme === 'claro' ? '#212529' : '#FFFFFF'} // Cor ajustada para tema
        >
          <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>
        </svg>
      </button>
      {showContent && (
        <div
          id="regulamento-content"
          className={`mt-2 p-4 text-center text-lg uppercase transition-opacity duration-300 ${
            theme.selectedTheme === 'claro'
              ? 'text-[#212529] bg-[#FFF0F5]' // Texto escuro em fundo rosado
              : 'text-[#FFFFFF]' // Texto branco no tema escuro
          }`}
        >
          <p>
            {titulo} - R${' '}
            {unitValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
            💰🍀
          </p>
          <br />
          <p>RIFA COM BASE NA LOTERIA FEDERAL, VÁLIDA PELA ÚLTIMA DEZENA.</p>
          <br />
          <p>
            O sorteio será realizado após todos os números serem esgotados. As
            compras dos números serão finalizadas via WhatsApp.
          </p>
        </div>
      )}
    </div>
  );
};

export default Regulamento;
