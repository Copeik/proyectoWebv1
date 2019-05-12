import { PedidosService } from './../../services/pedidos.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/services/articulos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Articulos } from 'src/app/model/Articulo';
import { Form, NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { CarritoComponent } from 'src/app/common/carrito/carrito.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  paginaActual=1;
  creartipo=false;
  admin:boolean = false;
  user;
  items:any;
  page:number=0;
  pages:Array<number>;
  base64textString:string;
  isError:boolean = false;
  tiposlist=[];
  constructor(private articulosService:ArticulosService,private _sanitizer: DomSanitizer,private authService:AuthenticationService,private _carritoService:CarritoService) { }

  ngOnInit() {
    this.authService.getuser();
    this.getArticulos();
    this.getAllTipos();
    this.user =JSON.parse(sessionStorage.getItem('Usuario'));
    if(this.user.rol!=null){
      if (this.user.rol.id_rol==3) {
        this.admin=true;
      }
      
    }
    
  }

  getAllTipos(){
   this._carritoService.getTipos().subscribe(res=>{
     this.tiposlist = res
   })
   console.log(this.tiposlist)
    
  }
  postTipo(){
    var tipo=Object();
    tipo.nombre=((<HTMLInputElement>document.getElementById("tipoa")).value);
    this._carritoService.postTipos(tipo).subscribe(res =>{
      console.log(res);
      this.creartipo=!this.creartipo
      this.getAllTipos();
    });
    
  }
  deleteArticulos(item,num){
     this.articulosService.deleteItem(item).subscribe(res =>{
       console.log(res)
       this.items.splice(num, 1);
     });
  }

  getarticulosCategoria(tipo){
    console.log(tipo);
     this.articulosService.getListaArticulosTipo(tipo).subscribe(res =>{
       this.items=res
     });
  }

  getArticulos(){
    this.articulosService.getAllItems().subscribe(res => {
    this.items=res;
    console.log(this.items)
    });
  }
  setPage(page){
    this.page=page;
    this.getArticulos();
  }
  guardarArticulo(){
      var articulo = new Articulos();
    var tipo=Object();
    tipo.codigo_t=((<HTMLInputElement>document.getElementById("tipoArticulo")).value);
    tipo.nombre=null;
    articulo.cantidad=parseInt((<HTMLInputElement>document.getElementById("cantidadArticulo")).value);
    articulo.codigo_tipo=tipo;
    articulo.nombre=(<HTMLInputElement>document.getElementById("nombreArticulo")).value;
    if(articulo.nombre ==""){
      articulo.nombre=null;
    }
    articulo.precio_articulo=(<HTMLInputElement>document.getElementById("precioArticulo")).value;
    articulo.fecha_caducidad=(<HTMLInputElement>document.getElementById("fechaArticulo")).value;
    articulo.descripcion=(<HTMLInputElement>document.getElementById("descripcionArticulo")).value;
    if (this.base64textString!=null) {
      articulo.imagen="data:image/jpeg;base64,"+this.base64textString;
    }
    console.log(articulo)
    this.articulosService.postArticulo(articulo).subscribe(res=>{
      console.log(res);
      this.isError=false;
    },error =>{
      this.isError=true
      setTimeout(()=>{
        this.isError=false;
      },4000)
    });
    
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


  addToCar(item){
    var carrito= sessionStorage.getItem("carrito");
    var carritolist=[]
    if(carrito==null){

      sessionStorage.setItem("carrito",JSON.stringify(carritolist)); 

      carrito= sessionStorage.getItem("carrito");
      console.log(carrito);
    }
    
    carritolist=JSON.parse(sessionStorage.getItem('carrito'));
    console.log()

    carritolist.push(item);

    sessionStorage.setItem("carrito",JSON.stringify(carritolist));

    alert("Añadido con exito tiene "+carritolist.length+" articulos")
    
     }
}
