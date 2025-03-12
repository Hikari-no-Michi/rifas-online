import React, { useState } from 'react';

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

  // Estado para controlar a exibição do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmPurchase, setIsConfirmPurchase] = useState(false);

  // Função para abrir o modal caso a quantidade de números seja menor que 3
  const handleClick = () => {
    if (selectedNumbers.length < 3) {
      setIsModalOpen(true);
    } else {
      window.open(generateWhatsAppLink(), '_blank');
    }
  };

  // Função para confirmar a compra ou comprar mais números
  const handleConfirm = () => {
    setIsConfirmPurchase(true);
    setIsModalOpen(false);
    window.open(generateWhatsAppLink(), '_blank');
  };

  const handleBuyMore = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-[98%] md:w-[60%] lg:w-[50%]">
      <button
        onClick={handleClick} // Abre o link do WhatsApp apenas se houver números selecionados
        disabled={isSelectedNumbersEmpty} // Desabilita o botão caso não haja números selecionados
        className={`mt-4 mb-4 flex w-full items-center justify-center rounded-xl px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r hover:from-green-600 hover:via-green-700 hover:to-green-800 focus:outline-none active:scale-95 active:shadow-none ${
          isSelectedNumbersEmpty
            ? 'bg-red-500 cursor-not-allowed' // Cor vermelha e cursor de não permitido se a lista estiver vazia
            : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700' // Cor verde se houver números selecionados
        }`}
      >
        <span className="text-lg">COMPRAR PONTOS POR</span>
        <span className="ml-3 text-2xl font-bold text-yellow-300">
          R$ {formattedPrice}
        </span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Ao comprar mais de 5 pontos, você recebe um desconto de 14%!
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleConfirm}
                className="bg-white py-2 px-6 text-gray-700 text-sm" // Reduzido o tamanho da fonte para text-sm
              >
                Quero comprar somente {selectedNumbers.length}
              </button>
              <button
                onClick={handleBuyMore}
                className="bg-green-500 text-white py-2 px-6 rounded-md text-sm" // Reduzido o tamanho da fonte para text-sm
              >
                Comprar mais!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyButton;
