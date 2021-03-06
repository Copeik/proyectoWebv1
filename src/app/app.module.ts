import { AppRoutingModule } from './app-route';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './Components/inicio/inicio.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { CatalogoComponent } from './Components/catalogo/catalogo.component';
import { CarritoComponent } from './common/carrito/carrito.component';
import { PedidosComponent } from './common/pedidos/pedidos.component';
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                 //api
import { PedidoComponent } from './common/pedido/pedido.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistroComponent } from './common/registro/registro.component';
import { NgxPayPalModule } from '../../node_modules/ngx-paypal';
import {MessagesModule} from 'primeng/messages';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SplitButtonModule} from 'primeng/splitbutton';
import { ModificarPedidoComponent } from './Components/modificar-pedido/modificar-pedido.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    SidebarComponent,
    CatalogoComponent,
    CarritoComponent,
    PedidosComponent,
    PedidoComponent,
    RegistroComponent,
    ModificarPedidoComponent
  ],
  imports: [
    DialogModule,
    SplitButtonModule,
    ConfirmDialogModule,
    TableModule,
    BrowserAnimationsModule,
    ToastModule,
    MessagesModule,
    NgxPayPalModule,
    NgxPaginationModule,
    AccordionModule,
    BrowserModule,
    TableModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
