'use client';

import Header from './componentes/header';
import PhotoApp from './componentes/foto';
import PriceApp from './componentes/price';
import ChooseTickets from './componentes/chooseTickets';
import BuyButton from './componentes/buyButton';
import { useEffect, useState } from 'react';
import Regulamento from './componentes/regulamento';
import Footer from './componentes/footer';

interface Produto {
  nome: string;
  urlImagem: string;
}

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

export default function Home() {
  const [produto, setProduto] = useState<Produto>({
    nome: 'Air Fryer Oven Electrolux 12L ',
    urlImagem:
      'https://precolandia.vtexassets.com/arquivos/ids/230260-800-450?v=638409217189530000&width=800&height=450&aspect=true',
  });
  const [logo, setLogo] = useState(
    'https://static.wixstatic.com/media/e66f92_893af88288724c8184b69bcbbd277e35~mv2.png/v1/crop/x_0,y_170,w_500,h_160/fill/w_400,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ENTRE__2_-removebg-preview.png'
  );
  const [productCount, setProductCount] = useState(0);
  const [unitValue, setUnitValue] = useState(1.5);
  const [totalValue, setTotalValue] = useState(unitValue * productCount);
  const [valueChooseTickets, setValueChooseTickets] = useState<number>(0);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const [theme, setTheme] = useState<Theme>({
    selectedTheme: 'escuro', // Configuração inicial
    claro: {
      corFundo: 'bg-[#FFFFFF]', // Fundo branco
      corTexto: 'text-gray-700', // Cinza escuro para contraste
      svgColors: '#6C757D', // Cinza médio para suavidade
    },
    escuro: {
      corFundo: 'bg-[#1A1A1A]', // Cinza escuro
      corTexto: 'text-[#FFFFFF]', // Branco
      svgColors: '#FFFFFF',
    },
  });

  useEffect(() => {
    setTotalValue(unitValue * selectedNumbers.length);
  }, [selectedNumbers]);

  useEffect(() => {
    if (valueChooseTickets > 0) {
      setProductCount(productCount + valueChooseTickets);
    }
  }, [valueChooseTickets]);

  return (
    <div
      className={`${
        theme.selectedTheme === 'claro' ? 'bg-[#FFFFFF]' : 'bg-[#1A1A1A]'
      } ${theme[theme.selectedTheme].corTexto}`}
      style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif;" }}
    >
      <header
        className={`flex h-[68px] w-full items-center justify-center ${
          theme[theme.selectedTheme].corFundo
        }`}
      >
        <Header logo="RYCK" setTheme={setTheme} theme={theme} />
      </header>

      <main
        className={`flex w-full flex-col items-center justify-start border-t-2 border-[#98BD43] ${
          theme[theme.selectedTheme].corFundo
        } pt-3`}
      >
        <PhotoApp
          produtoName={produto.nome}
          drawDate="Sorteio: 20/03/2025"
          urlImagem={produto.urlImagem}
          theme={theme}
        />

        <PriceApp
          price={unitValue}
          tituloPrimeiro="MINHAS CHANCES"
          tituloSegundo="GANHADORES"
          theme={theme}
        />

        <ChooseTickets
          setValueChooseTickets={setValueChooseTickets}
          options={Array.from({ length: 100 }, (_, i) => ({ value: i + 1 }))}
          setSelectedNumbers={setSelectedNumbers}
          selectedNumbers={selectedNumbers}
          theme={theme}
        />

        <BuyButton
          price={totalValue}
          selectedNumbers={selectedNumbers}
          produto={produto.nome}
        />

        <Regulamento
          unitValue={unitValue}
          titulo={produto.nome}
          theme={theme}
        />

        <Footer theme={theme} />
      </main>
    </div>
  );
}
