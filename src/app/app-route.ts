import { PedidoComponent } from './common/pedido/pedido.component';
import { PedidosComponent } from './common/pedidos/pedidos.component';
import { CarritoComponent } from './common/carrito/carrito.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './common/login/login.component';
import { RegistroComponent } from './common/registro/registro.component';
import { ModificarPedidoComponent } from './Components/modificar-pedido/modificar-pedido.component';
const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'pedido/:id',
    component: PedidoComponent
  },
  {
    path: 'modificarpedido/:id',
    component: ModificarPedidoComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}