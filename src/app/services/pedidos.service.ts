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

  header= new HttpHeaders();

  constructor(private http: HttpClient,private router:Router) { }

  token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aWN0b3IifQ.4n0H6mj8uIwbY674h4sBT0VgESnpvJkJ_Iqb98To0wFc-_wayJflDBSF3SdxksMCHIVT_XM64Jckou54w6snPw";

  comprar(ped:Pedidos ,especificaciones:Array<Especificaciones>){
   var cod;
    this.http.post<any>(`http://localhost:8090/v1/pedidos`,ped ,{headers: this.header.append("Authorization","Bearer "+ this.token) }).subscribe(res => {
      this.http.get<any>(`http://localhost:8090/v1/pedidoslast`,{headers: this.header.append("Authorization","Bearer "+ this.token) }).subscribe(pedidores => {cod = pedidores
    
      for (let i = 0; i < especificaciones.length; i++) {
         especificaciones[i].id.pedido=cod;
        this.http.post<any>(`http://localhost:8090/v1/especificaciones`,especificaciones[i] ,{headers: this.header.append("Authorization","Bearer "+ this.token) }).subscribe(res => {
          
        
          console.log(res);
          })
        
      }
    })
       
      
      })

  }
}
