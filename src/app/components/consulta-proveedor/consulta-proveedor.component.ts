import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent implements OnInit {


  ruc:string = "";
  razonsocial:string="";
  idPais:number = -1;
  estado:boolean = true;

  proveedor : Proveedor[] = [];

  pais : Pais[] = [];

  constructor(private proveedorService:ProveedorService, private utilService: UtilService) { 
    
    this.utilService.listaPais().subscribe(
 
       x => this.pais = x
     );
 
   }

   consultaProveedor(){

    this.proveedorService.listaFiltroProveedor(this.ruc,this.estado?1:0,this.idPais,this.razonsocial).subscribe(
  
        x => {this.proveedor = x.lista;
      
        Swal.fire('Mensaje',x.mensaje,'info');
      
      }
  
    )
  
    this.idPais = -1;
    this.razonsocial ="";
    this.ruc = "";
  
  }

  ngOnInit(): void {
  }

}
