import Link from 'next/link';

const Home = () => {
  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-semibold mb-4">Bem-vindo ao Entre Amigos Rifas!</h1>
      <p className="text-lg mb-6">Participe das rifas mais emocionantes e ganhe prêmios incríveis.</p>

      <h2 className="text-2xl font-medium mb-4">Rifas Disponíveis:</h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {/* Card 1: Máquina de Lavar Brastemp */}
        <div className="w-64 bg-yellow-400 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:translate-y-2 cursor-pointer">
          <Link href="/rifa/maquina-de-lavar-brastemp">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Máquina de Lavar Brastemp</h3>
              <p className="text-gray-600">Participe da rifa e ganhe uma máquina de lavar Brastemp novinha!</p>
            </div>
          </Link>
        </div>

        {/* Card 2: Geladeira Electrolux */}
        <div className="w-64 bg-teal-400 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:translate-y-2 cursor-pointer">
          <Link href="/rifa/geladeira-electrolux">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Geladeira Electrolux</h3>
              <p className="text-gray-600">Participe e ganhe uma geladeira Electrolux incrível!</p>
            </div>
          </Link>
        </div>

        {/* Card 3: Celular Samsung */}
        <div className="w-64 bg-blue-400 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:translate-y-2 cursor-pointer">
          <Link href="/rifa/celular-samsung">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Celular Samsung</h3>
              <p className="text-gray-600">Concorra a um celular Samsung novinho!</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
