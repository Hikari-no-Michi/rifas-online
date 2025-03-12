/*
import mongoose, { Schema, Document } from 'mongoose';

interface IRifa extends Document {
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  dataSorteio: Date;
  valorUnitario: number;
  quantidadePontos: number;
  status: string;
  linkFoto: string;
  saldoTotal: number;
  //usuario: mongoose.Schema.Types.ObjectId;
  numeroGanhador: number | null;
}

const RifaSchema: Schema = new Schema(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    dataSorteio: { type: Date, required: true },
    valorUnitario: { type: Number, required: true },
    quantidadePontos: { type: Number, required: true },
    status: { type: String, enum: ['Ativo', 'Inativo'], default: 'Ativo' },
    linkFoto: { type: String, required: true },
    saldoTotal: { type: Number, default: 0 },
    //usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    numeroGanhador: { type: Number, default: null },
  },
  {
    timestamps: true, 
  }
);

const Rifa = mongoose.models.Rifa || mongoose.model<IRifa>('Rifa', RifaSchema);

export default Rifa;
**/
import mongoose, { Schema, Document } from 'mongoose';

interface IRifa extends Document {
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  dataSorteio: Date;
  valorUnitario: number;
  quantidadePontos: number;
  status: string;
  linkFoto: string;
  saldoTotal: number;
  numeroGanhador: number | null;
  urlPersonalizada: string;
}

const RifaSchema: Schema = new Schema(
  {
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    dataSorteio: { type: Date, required: true },
    valorUnitario: { type: Number, required: true },
    quantidadePontos: { type: Number, required: true },
    status: { type: String, enum: ['Ativo', 'Inativo'], default: 'Ativo' },
    linkFoto: { type: String, required: true },
    saldoTotal: { type: Number, default: 0 },
    numeroGanhador: { type: Number, default: null },
    urlPersonalizada: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Rifa = mongoose.models.Rifa || mongoose.model<IRifa>('Rifa', RifaSchema);

export default Rifa;
