import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Tesis } from 'src/app/models/tesis.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { TesisService } from 'src/app/services/tesis.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-tesis',
  templateUrl: './consulta-tesis.component.html',
  styleUrls: ['./consulta-tesis.component.css']
})
export class ConsultaTesisComponent implements OnInit {

  titulo:string="";
  tema:string="";
  idAlumno:number=-1
  estado:boolean=true;

  alumnos: Alumno[]=[];

  tesis: Tesis [] = []



   constructor(private tesisService:TesisService,private utilService:UtilService){
    utilService.listaAlumno().subscribe(x =>
      this.alumnos=x
    );
   }

   ConsultaTesis(){
    this.tesisService.listaTesis(this.titulo,this.tema,this.idAlumno,this.estado?1:0).subscribe(
      x =>{
        this.tesis = x.lista;
        Swal.fire('mensaje',x.mensaje,'info');
      }
    )
   }
  ngOnInit(): void {
  }

}
