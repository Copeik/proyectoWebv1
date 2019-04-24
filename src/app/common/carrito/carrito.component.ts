import { DomSanitizer } from '@angular/platform-browser';
import { Articulos } from './../../model/Articulo';
import { Component, OnInit } from '@angular/core';
import { Especificaciones } from 'src/app/model/Especificaciones';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  articulos=Array<Articulos>();
  especificaciones:Array<Especificaciones> =[];
  total:number = 0;
  base64textString:string;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    
    setTimeout(() => {
      this.calcularTotal();
    }, 100);
    this.articulos=JSON.parse(sessionStorage.getItem("carrito"));
  }
  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}



_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(btoa(binaryString));
  }

  calcularTotal(){
    this.total=0;
    this.especificaciones = [];
    

    if (this.articulos !=null && this.articulos != undefined) {
      for (let i = 0; i < this.articulos.length; i++) {
        this.especificaciones.push({"id": { "pedido":{ "codpedido":0 },"art": {
          "codarticulo":0 }},"cantidad": 0,
          "precio":0});
        this.especificaciones[i].id.art.codarticulo = this.articulos[i].codarticulo;
        console.log(this.articulos[i].precio_articulo);
        var cantidad:any=(<HTMLInputElement>document.getElementById("cantidad-"+i)).value; 
        if(cantidad == NaN){
          cantidad =0;
        }
        console.log(cantidad);
        this.especificaciones[i].precio= parseInt(cantidad) * this.articulos[i].precio_articulo;
        this.total = this.total +this.especificaciones[i].precio;
      }
    }
    
    
  }
  comprar(){
   
    return this.http.post<any>(`http://localhost:8090/login`, { "usuario": username, "contrasena": password }).subscribe(res => {
      console.log(res);
    
      })

  }
  
}
