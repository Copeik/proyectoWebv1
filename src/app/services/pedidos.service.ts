import { User } from './../model/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Pedidos } from '../model/Pedidos';
import { Especificaciones } from '../model/Especificaciones';
import { Modificaciones } from '../model/Modificaciones';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  header = new HttpHeaders();

  constructor(private http: HttpClient, private router: Router) { }

  token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aWN0b3IifQ.4n0H6mj8uIwbY674h4sBT0VgESnpvJkJ_Iqb98To0wFc-_wayJflDBSF3SdxksMCHIVT_XM64Jckou54w6snPw";

  comprar(ped: Pedidos, especificaciones: Array<Especificaciones>) {
    var cod;
    this.http.post<any>(`http://localhost:8090/v1/pedidos`, ped, { headers: this.header.append("Authorization", "Bearer " + this.token) }).subscribe(res => {
      this.http.get<any>(`http://localhost:8090/v1/pedidoslast`, { headers: this.header.append("Authorization", "Bearer " + this.token) }).subscribe(pedidores => {
        cod = pedidores

        for (let i = 0; i < especificaciones.length; i++) {
          especificaciones[i].id.pedido = cod;
          this.http.post<any>(`http://localhost:8090/v1/especificaciones`, especificaciones[i], { headers: this.header.append("Authorization", "Bearer " + this.token) }).subscribe(res => {


            console.log(res);
          })

        }
      })


    })

  }

  update(ped: Pedidos, especificaciones: Array<Especificaciones>) {
    var cod;
    this.http.post<any>(`http://localhost:8090/v1/pedidos`, ped, { headers: this.header.append("Authorization", "Bearer " + this.token) }).subscribe(res => {


      for (let i = 0; i < especificaciones.length; i++) {
        console.log(especificaciones)
        this.http.post<any>(`http://localhost:8090/v1/especificaciones`, especificaciones[i], { headers: this.header.append("Authorization", "Bearer " + this.token) }).subscribe(res => {


          console.log(res);

        })
        this.router.navigate(["/pedidos"])
      }
      if (ped.estado.id != 7) {
        var modificacion = new Modificaciones();
        modificacion.codpedido = ped;
        this.deleteModificacion(modificacion).subscribe(res => { console.log("MODIFICACIONES ELIMINADAS") })
      }
    })




  }

  getallByAdmin() {
    return this.http.get<any>(`http://localhost:8090/v1/pedidos`, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }

  getallByCliente(id) {
    return this.http.get<any>(`http://localhost:8090/v1/pedidoscliente?cod_cliente=` + id, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }

  getallByPedido(id) {
    return this.http.get<any>(`http://localhost:8090/v1/pedido?cod_pedido=` + id, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }

  getEspecificacionesByPedido(id) {
    return this.http.get<any>(`http://localhost:8090/v1/especificacionesPedido?cod_pedido=` + id, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }

  deleteEspecificaciones(pedido) {
    console.log(pedido);
    this.http.get<any>(`http://localhost:8090/v1/especificacionesPedido?cod_pedido=` + pedido.codpedido, { headers: this.header.append("Authorization", "Bearer " + this.token) }).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        console.log(res[i], "res");
        this.http.post<any>(`http://localhost:8090/v1/especificacionesD`, res[i], { headers: this.header.append("Authorization", "Bearer " + this.token) }).subscribe(res => {
          console.log(res, "Borrado de esp")
        });
      }
    });
  }

  deletePedido(pedido) {
    return this.http.post<any>(`http://localhost:8090/v1/pedidosD`, pedido, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }

  postModificacion(modificacion: Modificaciones) {
    return this.http.post<any>(` http://localhost:8090/v1/modificaciones`, modificacion, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }

  deleteModificacion(modificacion: Modificaciones) {
    return this.http.post<any>(` http://localhost:8090/v1/modificacionesD`, modificacion, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }

  getModificacion(codpedido) {
    return this.http.get<any>(` http://localhost:8090/v1/modificacionesP?codigopedido=` + codpedido, { headers: this.header.append("Authorization", "Bearer " + this.token) });
  }
}
