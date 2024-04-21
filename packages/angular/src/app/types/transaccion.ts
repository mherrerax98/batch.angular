import { Operario } from "./operario";

export interface Transaccion {
    idOperac: string;
    operario?: Operario;
    fechaIni?: string,
    horaIni?: string,
    fechaFin?: string,
    horaFin?: string,
    horasTotal?: number,
}

export class TransaccionDetalle  {
    idCompro: string;
    numero: number;
    idOperac: string;
    operario?: Operario;
    fechaIni?: Date;
    horaIni?: string;
    fechaFin?: Date;
    horaFin?: string;
    horasTotal: number;
    idProduc: string;
    idPlanta: string;
    idOperacion: string;
    idRecurso: string;
    fechaElab: Date;
    tipoTransaccion: string;
    tipoTiempo: string;
    idCausa?: string;
    idActivo?: string;
    idUsuari: string;
    operac: string;
    fecMod: Date;
}

export interface ActualizarRecurso {
    idCompro: string;
    numero: number;
    idTransaccion: number;
    nuevaFecha: Date;
    hora: string;
    horasTotal?: number;
}