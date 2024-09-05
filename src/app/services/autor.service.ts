import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Autor } from '../models/autor.model';


const baseUrlAutor = AppSettings.API_ENDPOINT+ '/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http:HttpClient) { }

  registrar(data:Autor):Observable<any>{
    return this.http.post(baseUrlAutor, data);
  }
  listarGrado(nombres:string, telefono:string, idGrado: number, estado : number): Observable<any>{
    const params = new HttpParams().set("nombres", nombres).set("telefono", telefono).set("idGrado", idGrado).set("estado",estado);
    return this.http.get(baseUrlAutor + "/listaAutorConParametros", {params});
  }
  consultaPorNombres(filtro:String):Observable<Autor[]>{
    return this.http.get<Autor[]>(baseUrlAutor + "/listaAutorPorNombresLike/"+ filtro);
  }
  inserta(obj:Autor):Observable<any>{
    console.log("obj :::: ",obj);
    return this.http.post(baseUrlAutor + "/registraAutor", obj);
  }

  actualiza(obj:Autor):Observable<any>{
    return this.http.put(baseUrlAutor + "/actualizaAutor", obj);
  }

  elimina(idAutor:number):Observable<any>{
    return this.http.delete(baseUrlAutor + "/eliminaAutor/"+ idAutor);
  }

  }


