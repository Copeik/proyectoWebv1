import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './Components/inicio/inicio.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { RegistroUsuariosComponent } from './common/registro-usuarios/registro-usuarios.component';
import { RegistroArticulosComponent } from './common/registro-articulos/registro-articulos.component';
import { CarritoComponent } from './common/carrito/carrito.component';
import { PedidosComponent } from './common/pedidos/pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InicioComponent,
    SidebarComponent,
    CatalogoComponent,
    RegistroUsuariosComponent,
    RegistroArticulosComponent,
    CarritoComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
