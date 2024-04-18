export type ReqOperMaq = "S" | "N"

export interface Recurso {
    idRecurso: string,
    descripcion: string,
    reqOper: ReqOperMaq,
    reqMaq: ReqOperMaq
}