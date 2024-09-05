import { Categoria } from "./categoria.model";

export class Libro {
    
    idLibro?: number;
    titulo?: string;
    anio?: number;
    serie?: string;
    fechaRegistro?: Date;
    categoria?: Categoria;
    estado?: number;

}
