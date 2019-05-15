import { ConfirmationService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { Articulos } from './../../model/Articulo';
import { Component, OnInit, } from '@angular/core';
import { Especificaciones } from 'src/app/model/Especificaciones';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Pedidos } from 'src/app/model/Pedidos';
import { User } from 'src/app/model/Usuario';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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
  showSuccess: boolean;

  constructor(private _sanitizer: DomSanitizer,private pedservice:PedidosService,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.initConfig();
    
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
        this.especificaciones[i].cantidad= parseInt(cantidad);
        this.total = this.total +this.especificaciones[i].precio;
      }
    }
    
    
  }
  
  confirm() {
    this.confirmationService.confirm({
        message: 'Se va a proceder al cobro, ¿Desea continuar?',
        accept: () => {
          this.comprar();
        }
    });
}
  comprar(){
    
   var ped= new Pedidos();
  var user =sessionStorage.getItem("Usuario");
  var usuario:User=JSON.parse(user);
  console.log(usuario);
    ped.descripcion= (<HTMLInputElement>document.getElementById("descripcion")).value
    ped.total=this.total;
    ped.cliente=usuario;
    ped.fecha="122211";
    console.log(ped);
     this.pedservice.comprar(ped,this.especificaciones);
     this.articulos=[];
     this.especificaciones=[];
     this.total=0;
     sessionStorage.removeItem("carrito");
     this.initConfig();
  }

  eliminarArticulo(idart){
    for (let i = 0; i < this.articulos.length; i++) {
      if (this.articulos[i].codarticulo==idart) {
        this.articulos.splice(i,1);
      }
      
    }
    sessionStorage.setItem("carrito",JSON.stringify(this.articulos));
    this.calcularTotal();
    console.log(this.articulos);
      
    }



    //----------------

    public payPalConfig?: IPayPalConfig;


    private initConfig(): void {
      this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AcbVdb57moxEcqBzIMyRI480PZj2-9_OACAWZbAUig21XOKTu-38ZfJY8J-j2cBUvWT-DN3YqoYsOXmE',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: ""+this.total,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: ""+this.total
                }
              }
            },
            items: [
              {
                name: 'Pedido Somiplantas',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: ""+this.total,
                },
              }
            ]
          }
        ]
      },
      advanced: {
          commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          this.comprar();
          sessionStorage.removeItem("carrito");
          this.articulos=JSON.parse(sessionStorage.getItem("carrito"));
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      },
    };
    }
  }

