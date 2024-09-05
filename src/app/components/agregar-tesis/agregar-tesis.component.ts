import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Tesis } from 'src/app/models/tesis.model';
import { TesisService } from 'src/app/services/tesis.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-tesis',
  templateUrl: './agregar-tesis.component.html',
  styleUrls: ['./agregar-tesis.component.css']
})
export class AgregarTesisComponent implements OnInit {

 alumnos: Alumno[] = [];
 tesis: Tesis ={
   alumno:{
    idAlumno:-1
 }

 }
  constructor(private tesisService:TesisService, private utilService:UtilService) {
    utilService.listaAlumno().subscribe(x=>{
      this.alumnos=x;
    })
  }

  registraTesis(){
    this.tesisService.registrar(this.tesis).subscribe(
      x=>{
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.errores,
        })
      },
    )
  }
  ngOnInit(): void {

  }

}
