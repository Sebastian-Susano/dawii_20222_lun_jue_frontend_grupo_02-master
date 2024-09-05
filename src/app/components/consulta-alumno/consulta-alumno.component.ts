import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Pais } from 'src/app/models/pais.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-alumno',
  templateUrl: './consulta-alumno.component.html',
  styleUrls: ['./consulta-alumno.component.css']
})
export class ConsultaAlumnoComponent implements OnInit {



  nombres:string="";
  apellidos:string="";
  IdPais:number = -1; 
  estado:boolean = true;
  
  //Ubigeo
   Paises: Pais[]  = [];

  //Grila
  alumnos: Alumno[] = [];

  constructor(private alumnoService : AlumnoService , private utilService: UtilService) {
    utilService.listaPais().subscribe(x=>{
      this.Paises=x
    }
 );
 }
consultaAlumno(){
  this.alumnoService.listarpais(this.nombres,this.apellidos,this.IdPais,this.estado?1:0).subscribe(
    x =>{this.alumnos = x.lista;
      Swal.fire('mensaje',x.mensaje,'info');
    }
  );
}

  ngOnInit(): void {
  }

}
