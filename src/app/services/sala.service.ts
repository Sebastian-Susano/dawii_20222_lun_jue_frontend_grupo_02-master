import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Sala } from '../models/sala.model';

const baseUrlSala = AppSettings.API_ENDPOINT+ '/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http:HttpClient) { }

  insertaSala(obj:Sala):Observable<any>{
    return this.http.post(baseUrlSala,obj);
  }

  listaSede(numero:string,numAlumnos:string,idSede:number, estado:number): Observable<any>{
    const params = new HttpParams().set("numero", numero).set("numAlumnos", numAlumnos).set("idSede", idSede).set("estado",estado);  
    return this.http.get(baseUrlSala + "/listaSalaConParametros", {params});
  }

  consultaPorNumero(filtro:string):Observable<Sala[]>{
    return  this.http.get<Sala[]>(baseUrlSala +"/listaSalaPorNumeroLike/"+filtro); 
}  

inserta(obj:Sala):Observable<any>{
  console.log("obj :::: ",obj);
  return this.http.post(baseUrlSala + "/registraSala", obj);
}

actualiza(obj:Sala):Observable<any>{
  return this.http.put(baseUrlSala + "/actualizaSala", obj);
}

elimina(idSala:number):Observable<any>{
  return this.http.delete(baseUrlSala + "/eliminaSala/"+ idSala);
}

}
