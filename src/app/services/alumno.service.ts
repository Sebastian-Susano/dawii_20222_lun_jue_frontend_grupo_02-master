import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Alumno } from '../models/alumno.model';



const baseUrlAlumno = AppSettings.API_ENDPOINT+ '/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient) { }

  registrar(data:Alumno):Observable<any>{
    console.log(data);
    return this.http.post(baseUrlAlumno,data);
  }

  listarpais(nombres:string, apellido:string, IdPais:number, estado:number): Observable<any>{
      const params = new HttpParams().set("nombres",nombres).set("apellidos",apellido)
      .set("IdPais",IdPais).set("estado",estado);
      return this.http.get(baseUrlAlumno + "/listaAlumnoConParametros",{params});
    }
  
    consultaPorNombre(filtro:string):Observable<Alumno[]>{
      return  this.http.get<Alumno[]>(baseUrlAlumno +"/listaAlumnoPorNombreLike/"+filtro); 
  }  

    inserta(obj:Alumno):Observable<any>{
      console.log("obj :::: ",obj);
      return this.http.post(baseUrlAlumno + "/registraAlumno", obj);
    }
    
    actualiza(obj:Alumno):Observable<any>{
      return this.http.put(baseUrlAlumno + "/actualizaAlumno", obj);
    }
    
    elimina(idAlumno:number):Observable<any>{
      return this.http.delete(baseUrlAlumno + "/eliminaAlumno/"+ idAlumno);
    }
   
}
