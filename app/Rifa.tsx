'use client';

import Header from './componentes/header';
import PhotoApp from './componentes/foto';
import PriceApp from './componentes/price';
import ChooseTickets from './componentes/chooseTickets';
import BuyButton from './componentes/buyButton';
import { useEffect, useState } from 'react';
import Regulamento from './componentes/regulamento';
import Footer from './componentes/footer';

import './globals.css';

interface Rifa {
  titulo: string;
  descricao: string;
  dataSorteio: string;
  valorUnitario: number;
  quantidadePontos: number;
  status: string;
  linkFoto: string;
  saldoTotal: number;
  numeroGanhador: number | null;
  urlPersonalizada: string;
}

interface HomeSorteioProps {
  rifa: Rifa;
}

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

export default function HomeSorteio({ rifa }: HomeSorteioProps) {

  const [productCount, setProductCount] = useState(0);
  const [unitValue, _] = useState(rifa.valorUnitario);
  const [totalValue, setTotalValue] = useState(rifa.valorUnitario * productCount);
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
      corFundo: 'bg-[#0f172b]', // Cinza escuro
      corTexto: 'text-[#FFFFFF]', // Branco
      svgColors: '#FFFFFF',
    },
  });

  useEffect(() => {
    setTotalValue(rifa.valorUnitario * selectedNumbers.length);
  }, [selectedNumbers]);

  useEffect(() => {
    if (valueChooseTickets > 0) {
      setProductCount(productCount + valueChooseTickets);
    }
  }, [valueChooseTickets]);

  const dataSorteio = new Date(rifa.dataSorteio);
  dataSorteio.setDate(dataSorteio.getDate() + 1);

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
        <Header logo="RYCK RIFAS" setTheme={setTheme} theme={theme} />
      </header>

      <main
        className={`flex w-full flex-col items-center justify-start border-t-2 border-[#98BD43] ${
          theme[theme.selectedTheme].corFundo
        } pt-3`}
      >
        <PhotoApp
          produtoName={rifa.titulo}
          drawDate={dataSorteio.toLocaleDateString('pt-BR')}
          urlImagem={rifa.linkFoto}
          theme={theme}
        />

        <PriceApp
          price={rifa.valorUnitario}
          description={rifa.descricao}
          theme={theme}
        />

        <ChooseTickets
          setValueChooseTickets={setValueChooseTickets}
          options={Array.from({ length: rifa.quantidadePontos }, (_, i) => ({ value: i + 1 }))}
          setSelectedNumbers={setSelectedNumbers}
          selectedNumbers={selectedNumbers}
          theme={theme}
        />

        <BuyButton
          price={totalValue}
          selectedNumbers={selectedNumbers}
          produto={rifa.titulo}
        />

        <Regulamento
          unitValue={rifa.valorUnitario}
          titulo={rifa.titulo}
          theme={theme}
        />

        <Footer theme={theme} />
      </main>
    </div>
  );
}
