import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carrito=[];

  constructor() { }

  actualizarCarro(item){
    this.carrito.push(item);
  }


}
