import { useState, ChangeEvent, FormEvent } from 'react';
import '../app/globals.css';

interface FormData {
  titulo: string;
  descricao: string;
  dataSorteio: string;
  valorUnitario: string;
  quantidadePontos: string;
  linkFoto: string;
  //usuario: string; // Adicionando o campo 'usuario' ao estado
}

export default function CreateRifaForm() {
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    dataSorteio: '',
    valorUnitario: '',
    quantidadePontos: '',
    linkFoto: '',
    //usuario: '',  // Campo 'usuario' adicionado ao estado
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Função para lidar com mudanças no input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para enviar os dados
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log(formData);

    try {
      const response = await fetch('/api/Rifas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Enviando o campo 'usuario' junto aos outros dados
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          titulo: '',
          descricao: '',
          dataSorteio: '',
          valorUnitario: '',
          quantidadePontos: '',
          linkFoto: '',
          //usuario: '', // Limpando o campo 'usuario' após envio
        });
      } else {
        setError(data.message || 'Erro ao criar a rifa');
      }
    } catch (err) {
      setError('Erro ao enviar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Criar Nova Rifa</h2>
      
      {success && <div className="text-green-600 mb-4">Rifa criada com sucesso!</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="dataSorteio" className="block text-sm font-medium text-gray-700">Data de Sorteio</label>
            <input
              type="date"
              id="dataSorteio"
              name="dataSorteio"
              value={formData.dataSorteio}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="valorUnitario" className="block text-sm font-medium text-gray-700">Valor Unitário</label>
            <input
              type="number"
              id="valorUnitario"
              name="valorUnitario"
              value={formData.valorUnitario}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="quantidadePontos" className="block text-sm font-medium text-gray-700">Quantidade de Pontos</label>
            <input
              type="number"
              id="quantidadePontos"
              name="quantidadePontos"
              value={formData.quantidadePontos}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="linkFoto" className="block text-sm font-medium text-gray-700">Link da Foto</label>
            <input
              type="url"
              id="linkFoto"
              name="linkFoto"
              value={formData.linkFoto}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Criar Rifa'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
