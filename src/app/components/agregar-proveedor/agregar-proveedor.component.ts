import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Pais } from 'src/app/models/pais.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {

  lstPaises: Pais[] = [];

  objProveedor: Proveedor = {
    estado:1,
    pais:{
      idPais:-1
    }
  }
  constructor(private paisService: UtilService, private proveedorService: ProveedorService) { 
      this.paisService.listaPais().subscribe(
        x=> this.lstPaises = x
      );
  }

  insertaProv(){
    this.proveedorService.insertaProveedor(this.objProveedor).subscribe(
      x => Swal.fire({icon: 'info',title: 'Resultado del Registro',text: x.salida}) 
      
    );
    this.objProveedor = { 
      idProveedor:0,
      razonsocial:"",
      ruc:"",
      direccion:"",
      celular:"",
      contacto:"",
      estado:1,
      pais:{
        idPais:-1
    }

  }
  }
  ngOnInit(): void {
  }

}
