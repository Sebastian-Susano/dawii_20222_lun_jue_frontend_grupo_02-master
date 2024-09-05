import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Pais } from 'src/app/models/pais.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crud-alumno',
  templateUrl: './crud-alumno.component.html',
  styleUrls: ['./crud-alumno.component.css']
})
export class CrudAlumnoComponent implements OnInit {


  alumnos: Alumno[] = [];
  idPais: Pais[] = [];
  filtro: string = "";

  alumno: Alumno = { 
    idAlumno:0,
    nombres:"",
    apellidos:"",
    telefono:"",
    dni:"",
    correo:"",
    fechaNacimiento:undefined,
    fechaRegistro:undefined,
    estado:1,
    pais:{
      idPais: -1,
    }
  };

  submitted = false;

  
  
  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,20}')]),
    validaApellido: new FormControl('', [Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,20}')]),
    validanumTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
    validanumDni: new FormControl('', [Validators.required,Validators.pattern('[0-8]{8}')]),
    validanumCorreo: new FormControl('', [Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
});


 
formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,20}')]),
    validaApellido: new FormControl('', [Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,20}')]),
    validanumTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
    validanumDni: new FormControl('', [Validators.required,Validators.pattern('[0-8]{8}')]),
    validanumCorreo: new FormControl('', [Validators.required,Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
});

constructor(private alumnoService:AlumnoService, private utilService: UtilService) { 
    
  this.utilService.listaPais().subscribe(

     x => this.idPais = x
   );

 }

  ngOnInit(): void {
  }

  consulta(){
        this.alumnoService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
              x => this.alumnos = x
        );
  }  
  
  registra(){
        this.submitted = true;

        if (this.formsRegistra.invalid){

         return;
        }

        this.submitted = false;

        this.alumnoService.inserta(this.alumno).subscribe(
             x => { 
                    document.getElementById("btn_reg_cerrar")?.click();
                    Swal.fire('Mensaje', x.mensaje,'info'); 
                    this.alumnoService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.alumnos = x
                    ); 
             }
        );

          this.idPais =[];
          this.alumno = { 
            idAlumno:0,
          nombres:"",
          apellidos:"",
          telefono:"",
          dni:"",
          correo:"",
          fechaNacimiento:undefined,
          fechaRegistro:undefined,
          estado:1,
          pais:{
            idPais: -1
               }
         }
        }

  actualizaEstado(obj:Alumno){
      obj.estado = obj.estado == 1? 0 : 1;  
      this.alumnoService.actualiza(obj).subscribe();
  }

  buscar(obj:Alumno){
    this.alumno = obj;

    this.utilService.listaPais().subscribe(

      response => this.idPais = response
    );
}

  actualiza(){
    this.submitted = true;

    if (this.formsActualiza.invalid){
     return;
    }

    this.submitted = false;

    this.alumnoService.actualiza(this.alumno).subscribe(
            x => {
                 document.getElementById("btn_act_cerrar")?.click();
                 Swal.fire('Mensaje', x.mensaje,'info'); 
                 this.alumnoService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
                     x => this.alumnos = x
                 ); 
            }
      );


          this.idPais 
          this.alumno = { 
            idAlumno:0,
            nombres:"",
            apellidos:"",
            telefono:"",
            dni:"",
            correo:"",
            fechaNacimiento:undefined,
            fechaRegistro:undefined,
            estado:1,
            pais:{
              idPais: -1 
          

               }
         }
  }


 elimina(obj:Alumno){
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
                
                this.alumnoService.elimina(obj.idAlumno || 0).subscribe(
                    x  =>  {
                          Swal.fire('Mensaje',x.mensaje,'success');
                          this.alumnoService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
                                x => this.alumnos = x
                        
                                ); 
                    } 
                );
                
              }
          })
  }


}