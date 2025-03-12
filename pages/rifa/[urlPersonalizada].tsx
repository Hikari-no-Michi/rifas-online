import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HomeSorteio from '@/app/Rifa';
import database from '../../lib/mongodb';
import Rifa from '../../models/Rifa';

import { GetServerSideProps } from 'next';

interface RifaProps {
  rifa: {
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
  } | null;
}

const RifaPage = ({ rifa }: RifaProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!rifa) {
      router.push('/');
    }
  }, [rifa, router]);

  if (!rifa) {
    return null; // Evita renderização antes do redirecionamento
  }

  return <HomeSorteio rifa={rifa} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { urlPersonalizada } = context.params as { urlPersonalizada: string };

  try {
    await database.connect();
    const rifa = await Rifa.findOne({ urlPersonalizada }).lean();

    if (!rifa) {
      return { props: { rifa: null } };
    }

    return {
      props: {
        rifa: JSON.parse(JSON.stringify(rifa)), // Evita problemas com objetos Mongoose
      },
    };
  } catch (error) {
    console.error('Erro ao buscar a rifa:', error);
    return { props: { rifa: null } };
  } finally {
    await database.disconnect();
  }
};

export default RifaPage;
