import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-consulta-libro',
  templateUrl: './consulta-libro.component.html',
  styleUrls: ['./consulta-libro.component.css']
})
export class ConsultaLibroComponent implements OnInit {

    titulo:string="";
    estado:boolean = true;
    idCategoria:number=-1;
    anio: string="";
    
    categorias: Categoria[] = [];
    
    libros: Libro[]=[];
  
    constructor(private libroService: LibroService, private utilService: UtilService) { 

      this.utilService.listaCategoria().subscribe(
          x => this.categorias = x
      );
    }

    consultaLibro(){
      this.libroService.listaLibro(this.titulo, this.anio, this.idCategoria, this.estado?1:0).subscribe(
        x =>{
          this.libros = x.lista;
          Swal.fire('Mensaje', x.mensaje,'info');
      } 
      )

      this.idCategoria=-1;
    }


  ngOnInit(): void {
  }

}
