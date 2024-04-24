import { Operario } from "./operario";

export interface Batch {
    documento: string;
    area: string,
    estado: string,
    operario: Operario
}