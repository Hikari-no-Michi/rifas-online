import database from '../../lib/mongodb';
import Rifa from '../../models/Rifa';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      titulo,
      descricao,
      dataSorteio,
      valorUnitario,
      quantidadePontos,
      linkFoto,
      // usuario,
    } = req.body;

    try {
      await database.connect();

      const tituloUrl = titulo
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ç/g, "c")
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .replace(/\s+/g, '-')
        .toLowerCase();

      const hashSorteio = crypto
        .createHash('md5')
        .update(dataSorteio.toString())
        .digest('hex')
        .substring(0, 6);

      const urlPersonalizada = `${tituloUrl}-${hashSorteio}`;

      const novaRifa = new Rifa({
        titulo,
        descricao,
        dataCriacao: new Date(),
        dataSorteio: new Date(dataSorteio), // Garante conversão correta
        valorUnitario,
        quantidadePontos,
        status: "Ativo",
        linkFoto,
        // usuario,
        numeroGanhador: null,
        urlPersonalizada,
      });

      const resultado = await novaRifa.save();

      res.status(201).json({
        message: 'Rifa criada com sucesso!',
        rifa: resultado,
      });
    } catch (err) {
      console.error('Erro ao criar a rifa:', err);
      res.status(500).json({ message: 'Erro ao criar a rifa', error: err.message });
    } finally {
      await database.disconnect(); // Certifica que a conexão será fechada
    }
  } else if (req.method === 'GET') {
    try {
      await database.connect();

      const rifas = await Rifa.find({}, 'titulo valorUnitario linkFoto urlPersonalizada').lean();

      res.status(200).json(rifas); // Corrigido para `res.json()` ao invés de `NextResponse.json()`
    } catch (error) {
      console.error('Erro ao buscar rifas:', error);
      res.status(500).json({ message: 'Erro ao buscar rifas', error: error.message });
    } finally {
      await database.disconnect(); // Fecha a conexão no `GET`
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
