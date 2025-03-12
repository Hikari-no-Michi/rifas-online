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

interface TicketOption {
  value: number;
}

interface ChooseTicketsProps {
  options: TicketOption[];
  setValueChooseTickets: (value: number) => void;
  setSelectedNumbers: (value: number[]) => void;
  selectedNumbers: number[];
  theme: Theme;
}

const ChooseTickets: React.FC<ChooseTicketsProps> = ({
  options,
  setSelectedNumbers,
  selectedNumbers,
  theme,
}) => {
  const handleSelectNumber = (value: number) => {
    const updatedSelectedNumbers = selectedNumbers.includes(value)
      ? selectedNumbers.filter((num) => num !== value)
      : [...selectedNumbers, value];

    setSelectedNumbers(updatedSelectedNumbers);
  };

  return (
    <div className="w-[98%] md:w-[60%] lg:w-[50%] max-h-[300px] md:max-h-[500px] lg:max-h-[500px] overflow-y-auto scroll-container p-2">
      <div className="grid grid-cols-6 lg:grid-cols-10 md:grid-cols-10 gap-1">
        {options.map((option) => {
          const isSelected = selectedNumbers.includes(option.value);
          const themeClasses =
            theme.selectedTheme === 'escuro'
              ? isSelected
                ? 'bg-[#FFD700] text-[#212529] border border-[#DAA520]' // Amarelo vibrante com bordas douradas
                : 'bg-[#024a71] text-[#DCDCDC] border border-[#696969]' // Cinza escuro para contraste
              : isSelected
              ? 'bg-[#87CEFA] text-[#FFFFFF] border border-[#4682B4]' // Azul claro com bordas azul-escuro
              : 'bg-[#F0F8FF] text-[#212529] border border-[#B0C4DE]'; // Azul bem claro com bordas suaves

          return (
            <div
              key={option.value}
              className={`flex flex-col items-center justify-center rounded-md pt-4 pb-2 text-center cursor-pointer transition ${themeClasses}`}
              onClick={() => handleSelectNumber(option.value)}
            >
              <div
                className="mb-2 text-[18px] font-bold md:text-[24px] lg:text-[24px]"
                style={{
                  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
                }}
              >
                {option.value.toLocaleString('pt-BR')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseTickets;
