import { User } from './../../model/Usuario';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/model/Pedidos';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  paginaActual =1;
  listapedido:Array<Pedidos>=[];
  usuario:User;
  card:string = "pedidos";

  cols = [
    { field: 'codpedido', header: 'Codigo Pedido' },
    { field: 'descripcion', header: 'Descripcion' },
    { field: 'total', header: 'Total' }
];
  
  constructor(private pedidosService:PedidosService) { }

  ngOnInit() {
    this.usuario=JSON.parse(sessionStorage.getItem("Usuario"));
    console.log(this.usuario);
    this.getpedidosUser(this.usuario.id);
  }

  getpedidosUser(id){
   this.pedidosService.getallByCliente(id).subscribe(res =>{
     this.listapedido = res;
     console.log(res);
   });
  }

  changeCard(any){
    this.card=any;
  }

}
