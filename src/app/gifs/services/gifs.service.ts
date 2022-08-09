import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'zWK7hBr6ItK49Vxkv21Cs2xO5SJOFe72';  // Api Key de GIPHY

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]=[];


  // Cambiar any por su tipo correspondiente 
  public resultados: Gif[]= [];

  get historial (){
    return [...this._historial];
  }

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

   // if(localStorage.getItem('historial')){
   //   this._historial = JSON.parse(localStorage.getItem('historial')!);
   // }
  }

  buscarGifs( query:string = ''){
    query = query.trim().toLocaleLowerCase(); // Pone todo en minisculas

    if( !this._historial.includes(query) ){ // Comprueba las palabras duplicadas
    
      this._historial.unshift(query);

      this._historial = this._historial.splice(0,10)

      localStorage.setItem('historial', JSON.stringify(this._historial));

      

    }

    const params = new HttpParams().set('api_key',this.apiKey).set('limit','10').set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params:params})
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;

      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    }) // Obtenemos información de la api de giphy

    console.log(this._historial)

  }

}
