import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor.model';
import { Grado } from 'src/app/models/grado.model';
import { AutorService } from 'src/app/services/autor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-consulta-autor',
  templateUrl: './consulta-autor.component.html',
  styleUrls: ['./consulta-autor.component.css']
})
export class ConsultaAutorComponent implements OnInit {

//Ng model
nombres:string="";
telefono:string="";
idGrado:number = -1;
estado:boolean = true;

//Grado
grados: Grado[]  = [];

//Grilla
autor: Autor[] = [];

constructor(private autorService : AutorService, private utilService:UtilService) {
  utilService.listaGrado().subscribe( x =>{
    this.grados = x
  }
);
}


consultaAutor(){
 this.autorService.listarGrado(this.nombres, this.telefono, this.idGrado, this.estado?1:0).subscribe(
  x=>{
       this.autor = x.lista;
       Swal.fire('mensaje', x.mensaje, 'info');
      }
)
    }


  ngOnInit(): void {}

}
