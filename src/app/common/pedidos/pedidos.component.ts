import { Cliente } from './../../model/Cliente';
import { User } from './../../model/Usuario';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/model/Pedidos';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  paginaActual =1;
  listapedido:Array<Pedidos>=[];
  usuario:Cliente;
  card:string = "pedidos";
  titulo=" Tus pedidos :";
  formRegistro: FormGroup;
  cols = [
    { field: 'codpedido', header: 'Codigo Pedido' },
    { field: 'descripcion', header: 'Descripcion' },
    { field: 'estado', header: 'Estado' },
    { field: 'total', header: 'Total' }
];
items = [];


devueltaItem(algo){
  return this.items = [
    {label: 'Modificar', icon: 'pi pi-refresh', command: ($event) => {
      console.log()
     this.router.navigate(["/modificarpedido/"+algo])
    }},
    {label: 'Eliminar', icon: 'pi pi-times', command: () => {
        this.deletePedido(algo);
    }}
  ];
}
VerEstado(){
  console.log(this.formRegistro);
  
}


  constructor(private authenticationService:AuthenticationService,private fb: FormBuilder,private pedidosService:PedidosService,private router:Router) { 
    this.formRegistro = this.fb.group({
      usuario:['',Validators.required],
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      correo:['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      telefono:['',Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.maxLength(9)
      ])],
      contrasena:['',Validators.required],
      direccion:['',Validators.required],
    })

  }
  
  ngOnInit() {
    this.usuario=JSON.parse(sessionStorage.getItem("Usuario"));
    console.log(this.usuario);
    if (this.usuario.rol.id_rol==3) {
      this.getAllPedidos();
      this.titulo="Lista de pedidos :"
    }else if(this.usuario.rol.id_rol==1){
      
      this.getpedidosUser(this.usuario.id);
    }
      
  }

  guardarUsuario(){
    //Guardado de datos de usuario
  console.log(this.usuario);
        this.authenticationService.guardarUsuario(this.usuario);
        this.router.navigate(["/login"]);
        alert("Registrado con exito :D")
  }
  

  getpedidosUser(id){
   this.pedidosService.getallByCliente(id).subscribe(res =>{
     this.listapedido = res;
     console.log(res);
   });
  }

  getAllPedidos(){
    this.pedidosService.getallByAdmin().subscribe(res =>{
      this.listapedido = res;
      console.log(res);
    });
   }


   deletePedido(algo){

      this.pedidosService.deleteEspecificaciones(algo);
      setTimeout(() => {
        this.pedidosService.deletePedido(algo).subscribe( async res =>{
          console.log(res);
          if (res) {
            for (let i = 0; i < this.listapedido.length; i++) {
               algo.codpedido = this.listapedido[i].codpedido;
              this.listapedido.splice(i, 1);
            }
          }
        });
      }, 100);
      
   }
  changeCard(any){
    this.card=any;
  }
  Verpedido(number){
    this.router.navigate(["/pedido/"+number])
  }

}
