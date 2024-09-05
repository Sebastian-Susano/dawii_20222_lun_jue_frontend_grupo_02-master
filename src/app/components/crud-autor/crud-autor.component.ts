import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor.model';
import { Grado } from 'src/app/models/grado.model';
import { AutorService } from 'src/app/services/autor.service';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-autor',
  templateUrl: './crud-autor.component.html',
  styleUrls: ['./crud-autor.component.css']
})
export class CrudAutorComponent implements OnInit {
  autores: Autor[] = [];
   grados:  Grado[] = [];
   filtro: String = "";



   autor: Autor = {
    idAutor:0,
    nombres: "",
    apellidos: "",
    telefono: "",
    fechaRegistro:undefined,
    estado:1,
    grado:{
      idGrado: -1,
    }
   };
   submitted = false;

   formsRegistra = new FormGroup({
    validaNombres : new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,25}')]),
    validaApellidos: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,25}')]),
    validaTelefono:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
    validaGrado:  new FormControl('', [Validators.min(1)]),
  });

  formsActualiza = new FormGroup({
    validaNombres : new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,25}')]),
    validaApellidos: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,25}')]),
    validaTelefono:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
    validaGrado:  new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  constructor(private autorService:AutorService, private utilService: UtilService) {
    this.utilService.listaGrado().subscribe(
      x=> this.grados = x
    );
  }

  ngOnInit(): void {
  }

  consulta(){
    this.autorService.consultaPorNombres(this.filtro==""?"todos":this.filtro).subscribe(
        x=> this.autores = x
    );
  }

  registra(){
    this.submitted = true;

        if (this.formsRegistra.invalid){
         return;
        }

        this.submitted = false;

        this.autorService.inserta(this.autor).subscribe(
             x => {
                    document.getElementById("btn_reg_cerrar")?.click();
                    Swal.fire('Mensaje', x.mensaje,'info');
                    this.autorService.consultaPorNombres(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.autores = x
                    );
             }
        );

        this.grados =[];

        this.autor = {
          idAutor:0,
          nombres: "",
          apellidos: "",
          telefono: "",
          fechaRegistro:undefined,
          estado:1,
          grado:{
            idGrado: -1,
            descripcion:"-1"
          }

  }
}
  actualizaEstado(obj:Autor){
  obj.estado = obj.estado == 1? 0 : 1;
  this.autorService.actualiza(obj).subscribe();
     }

     busca(obj:Autor){
      this.autor = obj;

      this.utilService.listaGrado().subscribe(

        response => this.grados = response
      );
  }
  actualiza(){
    this.submitted = true;

    if (this.formsActualiza.invalid){
     return;
    }

    this.submitted = false;

    this.autorService.actualiza(this.autor).subscribe(
            x => {
                 document.getElementById("btn_act_cerrar")?.click();
                 Swal.fire('Mensaje', x.mensaje,'info');
                 this.autorService.consultaPorNombres(this.filtro==""?"todos":this.filtro).subscribe(
                     x => this.autores = x
                 );
            }
      );

      this.grados =[];

        this.autor = {
          idAutor:0,
          nombres: "",
          apellidos: "",
          telefono: "",
          fechaRegistro:undefined,
          estado:1,
          grado:{
            idGrado: -1,
            descripcion:"-1"

          }
       }
}
   elimina(obj:Autor){
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

        this.autorService.elimina(obj.idAutor || 0).subscribe(
            x  =>  {
                  Swal.fire('Mensaje',x.mensaje,'success');
                  this.autorService.consultaPorNombres(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.autores = x
                  );
            }
        );

      }
  })
}


}
