import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { UtilService } from 'src/app/services/util.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.css']
})
export class CrudLibroComponent implements OnInit {

  libros: Libro[] = [];
  categorias: Categoria[] = [];
  filtro: string = "";

  libro: Libro = {
    idLibro:0,
    titulo:"",
    anio:0,
    serie:"",
    estado:1,
    categoria:{
      idCategoria:-1
    }
  };

    //para verificar que e pulsó el boton
    submitted = false;

    formsRegistra = new FormGroup({
      validaTitulo: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
      validaAnio: new FormControl('',[Validators.required, Validators.pattern('[0-9]{4}')]),
      validaSerie: new FormControl('',[Validators.required, Validators.pattern('[A-Z0-9 ]{3,30}')]),
      validaCategoria: new FormControl('', [Validators.min(1)]),
    });
  
    formsActualiza = new FormGroup({
      validaTitulo: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
      validaAnio: new FormControl('',[Validators.required, Validators.pattern('[0-9]{4}')]),
      validaSerie: new FormControl('',[Validators.required, Validators.pattern('[A-Z0-9 ]{3,30}')]),
      validaCategoria: new FormControl('', [Validators.min(1)]),
      validaEstado: new FormControl('', [Validators.min(0)]),
    });

  
  constructor(private libroService:LibroService, private utilService:UtilService) { 
    
    this.utilService.listaCategoria().subscribe(
      x => this.categorias = x
    );

  }

  ngOnInit(): void {
  }

  consulta(){

    console.log("Consulta entrada");

    this.libroService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
      x => this.libros = x
    );

    console.log("Consulta terminada", this.libros);
  }

  Borrar(){
    this.libro = { 
      idLibro:0,
      titulo:"",
      anio:0,
      serie:"",
      estado:1,
      categoria:{
        idCategoria:-1
        }
      }
  }

  registrar(){
        this.submitted = true;
        //finaliza el método si hay un error
        if (this.formsRegistra.invalid){
         return;
        }
        this.submitted = false;
        this.libroService.inserta(this.libro).subscribe(
             x => { 
                    document.getElementById("btn_reg_cerrar")?.click();
                    Swal.fire('Mensaje', x.mensaje,'info'); 
                    this.libroService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.libros = x
                    ); 
             }
        ); 
            this.categorias
            this.libro = { 
            idLibro:0,
            titulo:"",
            anio:0,
            serie:"",
            estado:1,
            categoria:{
              idCategoria:-1
            }

        }
  }
  
  actualizaEstado(obj:Libro){
    obj.estado = obj.estado == 1? 0 : 1;  
    this.libroService.actualiza(obj).subscribe();
  }

  busca(obj:Libro){
    this.libro = obj;
    this.utilService.listaCategoria().subscribe(
      response => this.categorias = response);
  }

  actualiza(){
    this.submitted = true;

    if (this.formsActualiza.invalid){
    return;
    }

    this.submitted = false;

    this.libroService.actualiza(this.libro).subscribe(
        x => {
            document.getElementById("btn_act_cerrar")?.click();
            Swal.fire('Mensaje', x.mensaje,'info'); 
            this.libroService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
                x => this.libros = x
            ); 
        }
    );

    this.categorias
    this.libro = { 
      idLibro:0,
      titulo:"",
      anio:0,
      serie:"",
      estado:1,
      categoria:{
          idCategoria:-1
      }
    }
  }

  elimina(obj:Libro){
  console.log("Eliminar");

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
          
          this.libroService.elimina(obj.idLibro || 0).subscribe(
              x  =>  {
                    Swal.fire('Mensaje',x.mensaje,'success');
                    this.libroService.consultaPorTitulo(this.filtro==""?"todos":this.filtro).subscribe(
                          x => this.libros = x
                    ); 
              } 
          );
        }
    })
  }


}
