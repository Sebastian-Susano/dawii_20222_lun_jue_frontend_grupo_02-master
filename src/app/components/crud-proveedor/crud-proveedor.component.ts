import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

  public page: number | undefined;
  proveedores: Proveedor[] = [];
  paises: Pais[] = [];
  filtro: string = "";


  proveedor: Proveedor = {
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    direccion:"",
    celular:"",
    contacto:"",
    estado:1,
    fechaRegistro:undefined,
    pais:{
      idPais:-1
    }
  };

  submitted = false;

  formsRegistra = new FormGroup({
    validaRazonSocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
    validaRuc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{11}')]),
    validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
    validaCelular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
    validaContacto:new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
});

formsActualiza = new FormGroup({
  validaRazonSocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
  validaRuc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{11}')]),
  validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
  validaCelular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
  validaContacto:new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
  validaPais: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
});

  constructor(private proveedorService:ProveedorService, private utilService: UtilService) { 
    
    this.utilService.listaPais().subscribe(
 
       x => this.paises = x
     );
 
   }


  ngOnInit(): void {
  }

  consulta(){

    this.proveedorService.consultaPorRazonSocial(this.filtro==""?"todos":this.filtro).subscribe(

      x => this.proveedores = x

    );
  }


  limpieza(){
    this.proveedor = { 
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
  // Registrar

  registrar(){
    this.submitted = true;

    if (this.formsRegistra.invalid){
     return;
    }

    this.submitted = false;

    this.proveedorService.inserta(this.proveedor).subscribe(

      x => {

        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info'); 
        this.proveedorService.consultaPorRazonSocial(this.filtro==""?"todos":this.filtro).subscribe(
            x => this.proveedores = x
        ); 

      }

    );

    this.paises;
    console.log("HOLAAA",this.paises);
    this.proveedor = { 
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

  actualizaEstado(obj:Proveedor){
    obj.estado = obj.estado == 1? 0 : 1;  
    this.proveedorService.actualiza(obj).subscribe();
}

busca(obj:Proveedor){
  this.proveedor = obj;

  this.utilService.listaPais().subscribe(

    response => this.paises = response
  );
}

actualiza(){
  this.submitted = true;

  if (this.formsActualiza.invalid){
   return;
  }

  this.submitted = false;

  this.proveedorService.actualiza(this.proveedor).subscribe(
      x => {
          document.getElementById("btn_act_cerrar")?.click();
          Swal.fire('Mensaje', x.mensaje,'info'); 
          this.proveedorService.consultaPorRazonSocial(this.filtro==""?"todos":this.filtro).subscribe(
              x => this.proveedores = x
          ); 
      }
  );

  this.paises;

  this.proveedor = { 
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


elimina(obj:Proveedor){
  Swal.fire({
    title: '¿Desea eliminar?',
    text: "Los cambios no se van a revertir",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, elimina.',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
      if (result.isConfirmed) {
        
        this.proveedorService.elimina(obj.idProveedor || 0).subscribe(
            x  =>  {
                  Swal.fire('Mensaje',x.mensaje,'success');
                  this.proveedorService.consultaPorRazonSocial(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.proveedores = x
                  ); 
            } 
        );
        
      }
  })
}


}
