import { Injectable } from '@angular/core';
import { Especificaciones } from '../model/Especificaciones';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  especificacionesCarrito:Array<Especificaciones> =[];
  carrito=[];

  constructor() { }

  actualizarCarro(item){
    this.carrito.push(item);
  }


}
