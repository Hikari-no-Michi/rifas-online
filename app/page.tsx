import Link from 'next/link';

interface Rifa {
  _id: string;
  titulo: string;
  valorUnitario: number;
  linkFoto: string;
  urlPersonalizada: string;
}

async function getRifas(): Promise<Rifa[]> {
  try {
    const res = await fetch('http://localhost:3000/api/Rifas', { cache: 'no-store' }); // Use URL completa
    if (!res.ok) throw new Error(`Erro ao buscar rifas: ${res.statusText}`);
    
    const data = await res.json(); // Aguarda a conversão da resposta
    return data;
  } catch (error) {
    console.error('Erro ao buscar rifas:', error);
    return [];
  }
}

export default async function Home() {
  const rifas: Rifa[] = await getRifas();

  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-semibold mb-4">Bem-vindo ao Entre Amigos Rifas!</h1>
      <p className="text-lg mb-6">Participe das rifas mais emocionantes e ganhe prêmios incríveis.</p>

      <h2 className="text-2xl font-medium mb-4">Rifas Disponíveis:</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {rifas.map((rifa) => (
          <div
            key={rifa._id}
            className="w-64 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:translate-y-2 cursor-pointer border p-4"
          >
            <Link href={`/rifa/${rifa.urlPersonalizada}`}>
              <div>
                <img src={rifa.linkFoto} alt={rifa.titulo} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{rifa.titulo}</h3>
                <p className="text-gray-600 font-medium">Valor do ponto: R$ {rifa.valorUnitario.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
