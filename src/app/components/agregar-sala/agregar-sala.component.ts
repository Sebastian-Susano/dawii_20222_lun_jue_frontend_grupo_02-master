import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from 'src/app/models/sala.model';
import { Sede } from 'src/app/models/sede.model';
import { SalaService } from 'src/app/services/sala.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-sala',
  templateUrl: './agregar-sala.component.html',
  styleUrls: ['./agregar-sala.component.css']
})
export class AgregarSalaComponent implements OnInit {

  lstSede: Sede[] = [];

  objSala: Sala = {
    estado:-1,
    sede: {
       idSede : -1
    }

  };
  constructor(private sedeService:UtilService,private salaService:SalaService) {
    this.sedeService.listaSede().subscribe(
      x => this.lstSede = x 
    );
   }

   inserta(){
    this.salaService.insertaSala(this.objSala).subscribe(
      x => Swal.fire({icon: 'info',title: 'Resultado del Registro',text: x.sala}) 
    );
    this.lstSede;
 
          this.objSala = { 
            idSala:0,
            numero:"",
            piso:0,
            numAlumnos:0,
            recursos:0,
            estado:-1,
            sede:{
              idSede: -1
               }
         }
  }

  ngOnInit(): void {
  }


}
