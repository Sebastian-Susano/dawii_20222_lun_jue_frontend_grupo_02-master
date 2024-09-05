import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

import { Proveedor } from '../models/proveedor.model';

const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  insertaProveedor(obj:Proveedor):Observable<any>{
    console.log("HOLA :::: "+baseUrlProveedor,obj)
    return this.http.post(baseUrlProveedor,obj);
  }

  listaFiltroProveedor(ruc:string,estado:number,idPais:number, razonsocial:string): Observable<any>{
    const params = new HttpParams().set("ruc", ruc).set("estado", estado).set("idPais", idPais).set("razonSocial",razonsocial);  
    console.log("HOLA PARAMS :::: ",params)
    return this.http.get(baseUrlProveedor + "/listaProveedorConParametros", {params});
  }

  consultaPorRazonSocial(filtro:string):Observable<Proveedor[]>{
    return  this.http.get<Proveedor[]>(baseUrlProveedor +"/listaPorRazonSocialLike/"+filtro); 
}  

  inserta(obj:Proveedor):Observable<any>{
  return this.http.post(baseUrlProveedor + "/registraProveedor", obj);
}

  actualiza(obj:Proveedor):Observable<any>{
  return this.http.put(baseUrlProveedor + "/actualizaProveedor", obj);
}

  elimina(idProveedor:number):Observable<any>{
  return this.http.delete(baseUrlProveedor + "/eliminaProveedor/"+ idProveedor);
}

}
