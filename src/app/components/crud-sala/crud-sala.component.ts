import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/sala.model';
import { Sede } from 'src/app/models/sede.model';
import { SalaService } from 'src/app/services/sala.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-sala',
  templateUrl: './crud-sala.component.html',
  styleUrls: ['./crud-sala.component.css']
})
export class CrudSalaComponent implements OnInit {


  salas: Sala[] = [];
  sedes: Sede[] = [];
  filtro: string = "";


  sala: Sala = { 
    idSala:0,
    numero:"",
    piso:0,
    numAlumnos:0,
    recursos:0,
    fechaRegistro:undefined,
    estado:1,
    sede:{
      idSede: -1,
    }
  };

  submitted = false;


  
  formsRegistra = new FormGroup({
    validaNumero: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,4}')]),
    validaPiso: new FormControl('', [Validators.required,Validators.pattern('[0-9]{1}')]),
    validanumAlumnos: new FormControl('', [Validators.required,Validators.pattern('[0-9]{1}')]),
    validaRecursos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
    validaSede: new FormControl('', [Validators.min(1)]),
});

formsActualiza = new FormGroup({
  validaNumero: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,4}')]),
  validaPiso: new FormControl('', [Validators.required,Validators.pattern('[0-9]{1}')]),
  validanumAlumnos: new FormControl('', [Validators.required,Validators.pattern('[0-9]{1}')]),
  validaRecursos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
  validaSede: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
});

constructor(private salaService:SalaService, private utilService: UtilService) { 
    
  this.utilService.listaSede().subscribe(

     x => this.sedes = x
   );

 }

  ngOnInit(): void {
  }

  consulta(){
        this.salaService.consultaPorNumero(this.filtro==""?"todos":this.filtro).subscribe(
              x => this.salas = x
        );
  }

  prueba(){
    console.log("HOLA PUDE INGRESAR");
    this.sala = { 
      idSala:0,
      numero:"",
      piso:0,
      numAlumnos:0,
      recursos:0,
      estado:1,
      sede:{
        idSede: -1
         }
   }
  }
  registra(){
        this.submitted = true;

        if (this.formsRegistra.invalid){
          console.log("HOLA");
         return;
        }

        this.submitted = false;

        this.salaService.inserta(this.sala).subscribe(
             x => { 
                    document.getElementById("btn_reg_cerrar")?.click();
                    Swal.fire('Mensaje', x.mensaje,'info'); 
                    this.salaService.consultaPorNumero(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.salas = x
                    ); 
             }
        );

         this.sedes;
 
          this.sala = { 
            idSala:0,
            numero:"",
            piso:0,
            numAlumnos:0,
            recursos:0,
            estado:1,
            sede:{
              idSede: -1
               }
         }
  }

  actualizaEstado(obj:Sala){
      obj.estado = obj.estado == 1? 0 : 1;  
      this.salaService.actualiza(obj).subscribe();
  }

  busca(obj:Sala){
      this.sala = obj;

      this.utilService.listaSede().subscribe(

        response => this.sedes = response
      );
  }

  actualiza(){
    this.submitted = true;

    if (this.formsActualiza.invalid){
     return;
    }

    this.submitted = false;

    this.salaService.actualiza(this.sala).subscribe(
            x => {
                 document.getElementById("btn_act_cerrar")?.click();
                 Swal.fire('Mensaje', x.mensaje,'info'); 
                 this.salaService.consultaPorNumero(this.filtro==""?"todos":this.filtro).subscribe(
                     x => this.salas = x
                 ); 
            }
      );


    this.sedes;


    this.sala = { 
      idSala:0,
      numero:"",
      piso:0,
      numAlumnos:0,
      recursos:0,
      estado:1,
      sede:{
        idSede: -1
         }
   }
  }


  elimina(obj:Sala){
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
                
                this.salaService.elimina(obj.idSala || 0).subscribe(
                    x  =>  {
                          Swal.fire('Mensaje',x.mensaje,'success');
                          this.salaService.consultaPorNumero(this.filtro==""?"todos":this.filtro).subscribe(
                                x => this.salas = x
                          ); 
                    } 
                );
                
              }
          })
  }


}
