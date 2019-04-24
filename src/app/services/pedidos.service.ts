import { User } from './../model/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Pedidos } from '../model/Pedidos';
import { Especificaciones } from '../model/Especificaciones';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient,private router:Router) { }


  comprar(ped:Pedidos ,especificaciones:Array<Especificaciones>){
   
    this.http.post<any>(`http://localhost:8090/v1/pedidos`,ped ).subscribe(res => {
      console.log(res);
    
      for (let i = 0; i < especificaciones.length; i++) {
        this.http.post<any>(`http://localhost:8090/v1/especificaciones`,especificaciones[i] ).subscribe(res => {
          console.log(res);
        
          
          })
        
      }
      
      })

  }
}
