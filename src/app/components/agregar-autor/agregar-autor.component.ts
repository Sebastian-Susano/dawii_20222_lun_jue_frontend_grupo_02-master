import { Component, OnInit } from '@angular/core';
import { Grado } from 'src/app/models/grado.model';
import { Autor } from 'src/app/models/autor.model';
import { AutorService } from 'src/app/services/autor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent implements OnInit {

  grados: Grado[] = [];
  autor: Autor ={
      grado:{
        idGrado:-1
      }
  }
  constructor(private autorService:AutorService , private utilService: UtilService) {

    utilService.listaGrado().subscribe(x=>{
          this.grados=x;
    })
}

registrarAutor(){
    this.autorService.registrar(this.autor).subscribe(
      x=>{
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.errores,
        })
      },
    );
}

  ngOnInit(): void {
  }

}
