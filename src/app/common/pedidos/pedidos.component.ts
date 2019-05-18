import { Cliente } from './../../model/Cliente';
import { User } from './../../model/Usuario';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/model/Pedidos';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  paginaActual =1;
  listapedido:Array<Pedidos>=[];
  usuario:Cliente;
  card:string = "pedidos";
  titulo=" Tus pedidos :";
  cols = [
    { field: 'codpedido', header: 'Codigo Pedido' },
    { field: 'descripcion', header: 'Descripcion' },
    { field: 'estado', header: 'Estado' },
    { field: 'total', header: 'Total' }
];
items = [];

  constructor(private pedidosService:PedidosService,private router:Router) { }

  ngOnInit() {
    this.usuario=JSON.parse(sessionStorage.getItem("Usuario"));
    console.log(this.usuario);
    if (this.usuario.rol.id_rol==3) {
      this.items = [
        {label: 'Modificar', icon: 'pi pi-refresh', command: () => {
            
        }},
        {label: 'Eliminar', icon: 'pi pi-times', command: () => {
            
        }}
      ];
      this.getAllPedidos();
      this.titulo="Lista de pedidos :"
    }else if(this.usuario.rol.id_rol==1){
      this.items = [
        {label: 'Solicitar modificacion', icon: 'pi pi-refresh', command: () => {
            
        }}
      ];
      this.getpedidosUser(this.usuario.id);
    }
      
  }

  getpedidosUser(id){
   this.pedidosService.getallByCliente(id).subscribe(res =>{
     this.listapedido = res;
     console.log(res);
   });
  }

  getAllPedidos(){
    this.pedidosService.getallByAdmin().subscribe(res =>{
      this.listapedido = res;
      console.log(res);
    });
   }

  changeCard(any){
    this.card=any;
  }
  Verpedido(number){
    this.router.navigate(["/pedido/"+number])
  }

}
