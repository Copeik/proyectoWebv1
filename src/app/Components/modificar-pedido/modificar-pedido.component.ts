import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedidos } from 'src/app/model/Pedidos';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-modificar-pedido',
  templateUrl: './modificar-pedido.component.html',
  styleUrls: ['./modificar-pedido.component.scss']
})
export class ModificarPedidoComponent implements OnInit {
  Pedido;
  listaEspecificaciones;

  constructor(private confirmationService: ConfirmationService,private pedidosService:PedidosService,private _route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.cargarPedido()
  }
  cargarPedido(){
    this.pedidosService.getallByPedido(this._route.snapshot.paramMap.get('id')).subscribe(res =>{
      this.Pedido = res[0];
      console.log( res[0]);
      this.pedidosService.getEspecificacionesByPedido(this.Pedido.codpedido).subscribe(res =>{
        this.listaEspecificaciones=res;
        console.log(res,"Especificaciones");
      });
      
    });
    
  }
  comprar(){
    
    this.pedidosService.update(this.Pedido,this.listaEspecificaciones);
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Se guardaran los cambios. \n ¿Desea continuar?',
        accept: () => {
           this.comprar();
        }
    });
}

  UpdateTotal(){
    this.Pedido.total=0;
    for (let i = 0; i < this.listaEspecificaciones.length; i++) {
      this.listaEspecificaciones[i].precio =(this.listaEspecificaciones[i].cantidad*this.listaEspecificaciones[i].id.art.precio_art);
      this.Pedido.total = this.Pedido.total + parseFloat(this.listaEspecificaciones[i].precio)
    }
  }
}
