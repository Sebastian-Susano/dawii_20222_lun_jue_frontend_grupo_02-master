import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/sala.model';
import { Sede } from 'src/app/models/sede.model';
import { SalaService } from 'src/app/services/sala.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-sala',
  templateUrl: './consulta-sala.component.html',
  styleUrls: ['./consulta-sala.component.css']
})
export class ConsultaSalaComponent implements OnInit {

  numero:string = "";
  numAlumnos:string="";
  idSede:number = -1;
  estado:boolean = true;

  sede : Sede[] = [];

  sala : Sala[] = [];

  constructor(private salaService:SalaService, private utilService: UtilService) { 
    
   this.utilService.listaSede().subscribe(

      x => this.sede = x
    );

  }

  consultaSala(){

  this.salaService.listaSede(this.numero,this.numAlumnos,this.idSede,this.estado?1:0).subscribe(

    x => {this.sala = x.lista;
    
      Swal.fire('Mensaje',x.mensaje,'info');
    
    }

  )

  this.idSede = -1;

}
  ngOnInit(): void {
  }

}
