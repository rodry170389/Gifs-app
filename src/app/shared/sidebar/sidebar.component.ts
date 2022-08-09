import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  // Llamamos al servicio
  constructor(private gifsService:GifsService) {}

  get historialSidebar (){
    return this.gifsService.historial;
    
  }

  buscar (termino: string){
    return this.gifsService.buscarGifs(termino);
  }

}
