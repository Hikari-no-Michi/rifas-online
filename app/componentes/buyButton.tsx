import React, { useState, useEffect } from 'react';

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
  const formattedPrice = price.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const generateWhatsAppLink = () => {
    const formattedNumbers = selectedNumbers.join(', ');
    const message = `Estou interessado em comprar os números: [${formattedNumbers}]. Total: R$ ${formattedPrice}. Rifa: ${produto} `;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/+5586994059642?text=${encodedMessage}`;
  };

  const isSelectedNumbersEmpty = selectedNumbers.length === 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmPurchase, setIsConfirmPurchase] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }
  
    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [isModalOpen]);
  
  

  const handleClick = () => {
    if (selectedNumbers.length < 3) {
      setIsModalOpen(true);
    } else {
      window.open(generateWhatsAppLink(), '_blank');
    }
  };

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
        onClick={handleClick} 
        disabled={isSelectedNumbersEmpty} 
        className={`mt-4 mb-4 flex w-full items-center justify-center rounded-xl px-8 py-3 font-semibold text-white hover:shadow-xl hover:bg-gradient-to-r hover:from-green-600 hover:via-green-700 hover:to-green-800 focus:outline-none ${
          isSelectedNumbersEmpty
            ? 'bg-red-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700' 
        }`}
      >
        <span className="text-xl">Comprar por</span>
        <span className="ml-3 text-xl font-bold text-yellow-300">
          R$ {formattedPrice}
        </span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-3 rounded-lg max-w-sm w-[90%] md:w-[60%] lg:w-[50%]">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 text-center">
              Ao comprar mais de 5 pontos, você recebe um desconto de 14%!
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleConfirm}
                className="bg-white py-2 px-6 text-gray-700 text-sm"
              >
                Quero comprar somente {selectedNumbers.length}
              </button>
              <button
                onClick={handleBuyMore}
                className="bg-green-500 text-white py-2 px-6 rounded-md text-sm"
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
