import { PedidosComponent } from './common/pedidos/pedidos.component';
import { CarritoComponent } from './common/carrito/carrito.component';
import { HomeComponent } from './Components/home/home.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { LoginComponent } from './common/login/login.component';
import { RegistroArticulosComponent } from './common/registro-articulos/registro-articulos.component';
import { RegistroUsuariosComponent } from './common/registro-usuarios/registro-usuarios.component';
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
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'home',
    component: HomeComponent
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
    path: 'registro-articulos',
    component: RegistroArticulosComponent
  },
  {
    path: 'registro-usuarios',
    component: RegistroUsuariosComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}