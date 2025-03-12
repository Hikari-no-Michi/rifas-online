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
      //usuario,  
    } = req.body;

    try {
      await database.connect();

      // Normaliza e formata o título para URL
      const tituloUrl = titulo
        .normalize("NFD") // Remove acentos
        .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
        .replace(/ç/g, "c") // Substitui 'ç' por 'c'
        .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .toLowerCase();

      // Cria um hash MD5 baseado na data do sorteio
      const hashSorteio = crypto
        .createHash('md5')
        .update(dataSorteio.toString())
        .digest('hex')
        .substring(0, 6);

      // Gera a URL personalizada
      const urlPersonalizada = `${tituloUrl}-${hashSorteio}`;

      const novaRifa = new Rifa({
        titulo,
        descricao,
        dataCriacao: new Date(),  
        dataSorteio: new Date(dataSorteio),
        valorUnitario,
        quantidadePontos,
        status: "Ativo",  
        linkFoto,
        //usuario,  
        numeroGanhador: null,
        urlPersonalizada, // Adicionando a URL personalizada gerada
      });

      const resultado = await novaRifa.save();

      res.status(201).json({
        message: 'Rifa criada com sucesso!',
        rifa: resultado,
      });

      await database.disconnect();
    } catch (err) {
      console.error('Erro ao criar a rifa:', err);
      res.status(500).json({ message: 'Erro ao criar a rifa', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
