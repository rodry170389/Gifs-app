import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})

export class BusquedaComponent {
 
  @ViewChild('txtBuscar') txtBuscarC!:ElementRef<HTMLInputElement>;


  // Llamamos al servicio
  constructor(private gifsService:GifsService) {}

  buscar(){

    const valor = this.txtBuscarC.nativeElement.value;

    if (valor.trim().length === 0){ // Deshabilita el boton enter cuando esta vacio
      return;
    }

    this.gifsService.buscarGifs(valor); // Llamamos a la función buscarGifs, este esta en el servicio de gifs

    this.txtBuscarC.nativeElement.value = ''; // Borramos la información despues de guardar la entrada
  }

}
