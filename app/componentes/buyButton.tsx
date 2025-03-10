import React from 'react';

interface BuyButtonProps {
  price: number;
  selectedNumbers: number[];
  produto: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  price,
  selectedNumbers,
  produto,
}) => {
  // Formatação do preço para o formato brasileiro
  const formattedPrice = price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Função para gerar o link do WhatsApp
  const generateWhatsAppLink = () => {
    const formattedNumbers = selectedNumbers.join(', '); // Formatar as dezenas como uma string
    const message = `Estou interessado em comprar os números: [${formattedNumbers}]. Total: R$ ${formattedPrice}. Rifa: ${produto} `;
    const encodedMessage = encodeURIComponent(message); // Codificar a mensagem para URL
    return `https://wa.me/+5586994059642?text=${encodedMessage}`;
  };

  // Verifica se a lista de números está vazia
  const isSelectedNumbersEmpty = selectedNumbers.length === 0;

  return (
    <div className="w-[98%] md:w-[60%] lg:w-[50%]">
      <button
        onClick={() =>
          !isSelectedNumbersEmpty &&
          window.open(generateWhatsAppLink(), '_blank')
        } // Abre o link do WhatsApp apenas se houver números selecionados
        disabled={isSelectedNumbersEmpty} // Desabilita o botão caso não haja números selecionados
        className={`mt-4 mb-4 flex w-full items-center justify-center rounded-lg px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none active:scale-95 active:shadow-none ${
          isSelectedNumbersEmpty
            ? 'bg-red-500 cursor-not-allowed' // Cor vermelha e cursor de não permitido se a lista estiver vazia
            : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700' // Cor verde se houver números selecionados
        }`}
      >
        <span className="text-lg">Comprar Números</span>
        <span className="ml-3 text-lg font-bold">R$ {formattedPrice}</span>
      </button>
    </div>
  );
};

export default BuyButton;
