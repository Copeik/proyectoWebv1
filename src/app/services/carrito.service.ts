import { Injectable } from '@angular/core';
import { Especificaciones } from '../model/Especificaciones';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  especificacionesCarrito:Array<Especificaciones> =[];
  carrito=[];
  token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aWN0b3IifQ.4n0H6mj8uIwbY674h4sBT0VgESnpvJkJ_Iqb98To0wFc-_wayJflDBSF3SdxksMCHIVT_XM64Jckou54w6snPw";
  header = new HttpHeaders();

  constructor(private http: HttpClient,private router:Router) { }

  actualizarCarro(item){
    this.carrito.push(item);
  }

  getTipos(){
    return this.http.get<any>(`http://localhost:8090/v1/tipo`,{headers: this.header.append("Authorization","Bearer "+ this.token) });
  }

  postTipos(tipo){
    return this.http.post<any>(`http://localhost:8090/v1/tipo`,tipo,{headers: this.header.append("Authorization","Bearer "+ this.token) });
  }
}
