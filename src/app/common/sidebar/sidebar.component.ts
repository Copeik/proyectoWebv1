import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  carritonumero;
  carrito:Array<any>;
  constructor() { }

  ngOnInit() {
    // this.carrito=JSON.parse(sessionStorage.getItem('carrito'))
    // console.log(this.carrito);
    // if(this.carrito !=null && this.carrito != undefined){
    //   this.carritonumero=this.carrito.length;
    //   console.log(this.carrito.length)
    //   console.log(this.carritonumero);
    // }
  }


  
  CerrarSesion(){
    sessionStorage.removeItem("Usuario");
    
    sessionStorage.removeItem("carrito");
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

}
