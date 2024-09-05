import { Grado } from "./grado.model";

export class Autor {

  idAutor?: number;
    nombres?:string;
    apellidos?:string;
    telefono?:string;
    fechaNacimiento?:Date ;
    fechaRegistro?: Date;
    estado?:number;
    grado?:Grado;
}
