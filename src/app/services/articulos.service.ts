import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  header= new HttpHeaders();
  constructor(private http: HttpClient,private router:Router) {
    this.header.set
   }
   token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aWN0b3IifQ.4n0H6mj8uIwbY674h4sBT0VgESnpvJkJ_Iqb98To0wFc-_wayJflDBSF3SdxksMCHIVT_XM64Jckou54w6snPw";


  getListaArticulos(page){
    return this.http.get<any>(`http://localhost:8090/v1/articuloP?page=${page}&size=9`,{headers: this.header.append("Authorization","Bearer "+ this.token) });
  }
  getListaArticulosTipo(tipo){
    return this.http.get<any>(`http://localhost:8090/v1/articuloT?tipo=${tipo}`,{headers: this.header.append("Authorization","Bearer "+ this.token) });
  }
  getAllItems(){
    return this.http.get<any>(`http://localhost:8090/v1/articulo`,{headers: this.header.append("Authorization","Bearer "+ this.token) });
  }
  postArticulo(a){
    return this.http.post<any>(`http://localhost:8090/v1/articulo`,a,{headers: this.header.append("Authorization","Bearer "+ this.token) });
  }
  deleteItem(cod_item){
    return this.http.post<any>(`http://localhost:8090/v1/articuloD?`,cod_item,{headers: this.header.append("Authorization","Bearer "+ this.token) });
  }
}
