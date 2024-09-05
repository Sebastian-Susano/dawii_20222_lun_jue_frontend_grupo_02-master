import { Sede } from "./sede.model";

export class Sala {

    idSala?: number;
    numero?:string;
    piso?:number;
    numAlumnos?:number;
    recursos?:number;
    fechaRegistro?:Date;
    estado?:number
    sede?:Sede;
}
