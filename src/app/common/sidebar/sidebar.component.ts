import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  carritonumero;
  carrito;
  constructor() { }

  ngOnInit() {
    this.carrito=sessionStorage.getItem("Carrito")
    console.log(this.carrito);
    if(this.carrito !=null && this.carrito != undefined){
      this.carrito=JSON.parse(this.carrito)
      this.carritonumero=this.carrito.lenght;
      console.log(this.carritonumero);
    }
  }


  
  CerrarSesion(){
    sessionStorage.removeItem("Usuario");
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

}
