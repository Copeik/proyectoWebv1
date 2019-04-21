import { DomSanitizer } from '@angular/platform-browser';
import { Articulos } from './../../model/Articulo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  articulos:Array<Articulos>=[];
  especificaciones:Array<any>=[];
  total:number;
  base64textString:string;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
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
    
    for (let i = 0; i < this.articulos.length; i++) {
      this.especificaciones[i] = this.articulos[i];
      
    }
  }
}
