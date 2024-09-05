import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno.model';
import { Tesis } from 'src/app/models/tesis.model';
import { TesisService } from 'src/app/services/tesis.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-crud-tesis',
  templateUrl: './crud-tesis.component.html',
  styleUrls: ['./crud-tesis.component.css']
})
export class CrudTesisComponent implements OnInit {

  tesi: Tesis []=[];
  filtro:string="";

  alumnos: Alumno[] = [];

  tesis : Tesis = {
   idTesis:0,
   titulo:"",
   tema:"",
   fechaCreacion:undefined,
   fechaRegistro:undefined,
   estado:1,
   alumno:{
    idAlumno:-1,
   }
  };

  submitted = false;

  formsRegistra = new FormGroup({
    validaTitulo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,80}')]),
    validaTema: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,80}')]),
    validaAlumno: new FormControl('',[Validators.min(1)]),
  });

  formsActualiza = new FormGroup({
    validaTitulo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,80}')]),
    validaTema: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,80}')]),
    validaAlumno: new FormControl('',[Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  constructor(private tesisService:TesisService, private utilService:UtilService) {
    utilService.listaAlumno().subscribe(x=>{
      this.alumnos=x;
    })
  }

  ngOnInit(): void {
  }
 consulta(){
  this.tesisService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
    x => this.tesi = x
  );
 }

 registra(){
  this.submitted = true;

  if(this.formsRegistra.invalid){
    return;
  }
  this.submitted = false;

 this.tesisService.inserta(this.tesis).subscribe(

  x => {
    document.getElementById("btn_reg_cerrar")?.click();
    Swal.fire('Mensaje',x.mensaje,'info');
    this.tesisService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
      x => this.tesi = x
    );
  }

 );
 this.alumnos = [];

 this.tesis = {
  idTesis:0,
   titulo:"",
   tema:"",
   estado:1,
   alumno:{
    idAlumno:-1,
 }
 }
 }

 actualizaEstado(obj:Tesis){
  obj.estado = obj.estado == 1? 0:1;
  this.tesisService.actualiza(obj).subscribe();
 }

 busca(obj:Tesis){
   this.tesis = obj;

   this.utilService.listaAlumno().subscribe(
    response => this.alumnos = response
   );
 }

 actualiza(){
  this.submitted = true;
  if(this.formsActualiza.invalid){
    return;
  }
  this.submitted = false;


  this.tesisService.actualiza(this.tesis).subscribe(
    x =>{
       document.getElementById("btn_act_cerrar")?.click();
      Swal.fire('Mensaje',x.mensaje,'info');
      this.tesisService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
        x => this.tesi =x
      );
    }

  );

  this.alumnos;
 }

 elimina(obj:Tesis){
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

        this.tesisService.eliminar(obj.idTesis || 0).subscribe(
            x  =>  {
                  Swal.fire('Mensaje',x.mensaje,'success');
                  this.tesisService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.tesi = x
                  );
            }
        );

      }
  })
}
}
