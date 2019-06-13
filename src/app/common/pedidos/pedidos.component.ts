import { Cliente } from './../../model/Cliente';
import { User } from './../../model/Usuario';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from 'src/app/model/Pedidos';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Modificaciones } from 'src/app/model/Modificaciones';
import {MessagesModule} from 'primeng/messages';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  msgs=[];
  paginaActual = 1;
  listapedido: Array<Pedidos> = [];
  usuario: Cliente;
  card: string = "pedidos";
  titulo = " Tus pedidos :";
  formRegistro: FormGroup;
  Modificacion: Modificaciones;
  cols = [
    { field: 'codpedido', header: 'Codigo Pedido' },
    { field: 'descripcion', header: 'Descripcion' },
    { field: 'estado', header: 'Estado' },
    { field: 'total', header: 'Total' }
  ];
  items = [];
  codpedido;
  editable = true;
  devueltaItem(algo) {
    if (this.usuario.rol.id_rol == 3) {
      return this.items = [
        {
          label: 'Modificar', icon: 'pi pi-refresh', command: ($event) => {
            console.log()
            this.router.navigate(["/modificarpedido/" + algo.codpedido])
          }
        },
        {
          label: 'Eliminar', icon: 'pi pi-times', command: () => {
            this.deletePedido(algo);
          }
        }
      ];
    } else {
      return this.items = [
        {
          label: 'Solicitar modificacion', icon: 'pi pi-refresh', command: ($event) => {
            this.showDialog(algo);
          }
        },
        {
          label: 'Cancelar pedido', icon: 'pi pi-times', command: () => {
            this.cancelarPedido(algo);
          }
        }
      ];
    }



  }
  VerEstado() {
    console.log(this.formRegistro);

  }


  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private pedidosService: PedidosService, private router: Router) {
    this.formRegistro = this.fb.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      telefono: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.maxLength(9)
      ])],
      contrasena: ['', Validators.required],
      direccion: ['', Validators.required],
    })

  }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem("Usuario"));
    console.log(this.usuario);
    this.cargarpedidos();

  }
  cargarpedidos(){
    if (this.usuario.rol.id_rol == 3) {
      this.getAllPedidos();
      this.titulo = "Lista de pedidos :"
    } else {
      this.getpedidosUser(this.usuario.id);
    }
  }

  display: boolean = false;

  showDialog(codpedido) {
    this.display = true;
    this.editable = true;
    this.codpedido = codpedido;
  }
  showDialog2(codpedido) {
    this.display = true;
    this.editable = false;
    this.codpedido = codpedido;

  }
  cancelarPedido(algo){
    this.codpedido = algo;
    var a = "Cancelar pedido"
    console.log(a)
    if (a.trim() != "") {
      console.log(a)
      var ped;
      ped = { codpedido: this.codpedido.codpedido }
      var modificacion = new Modificaciones();
      modificacion.codpedido = ped;
      modificacion.modificado = false;

      modificacion.textoModificacion = a;
      console.log(modificacion)

      this.pedidosService.deleteModificacion(modificacion).subscribe(res =>{
        console.log(res);
        if (res==true) {
          this.pedidosService.postModificacion(modificacion).subscribe(res => {
            console.log(res);
            (<HTMLInputElement>document.getElementById("textarea")).value = ""
          })
        }
        
      })
      
    }
  }

  textoEnsena() {
    var a = (<HTMLInputElement>document.getElementById("textarea")).value
    console.log(a)
    if (a.trim() != "") {
      console.log(a)
      var ped;
      ped = { codpedido: this.codpedido.codpedido }
      var modificacion = new Modificaciones();
      modificacion.codpedido = ped;
      modificacion.modificado = false;

      modificacion.textoModificacion = a;
      console.log(modificacion)

      this.pedidosService.deleteModificacion(modificacion).subscribe(res =>{
        console.log(res);
        if (res==true) {
          this.pedidosService.postModificacion(modificacion).subscribe(res => {
            console.log(res);
            (<HTMLInputElement>document.getElementById("textarea")).value = ""
          })
        }
        
      })
      
    }
    this.display = false

  }

  obtenerModificacion(codpedido) {
    this.pedidosService.getModificacion(codpedido).subscribe(res => {
      console.log(res)
      this.Modificacion = res;
      this.showDialog2(codpedido);
    });
  }
  cancelarM() {
    this.display = false
    var a = (<HTMLInputElement>document.getElementById("textarea")).value = ""
  }

  guardarUsuario() {
    //Guardado de datos de usuario
    console.log(this.usuario);
    this.authenticationService.guardarUsuario(this.usuario);
    this.msgs.push({severity:'success', summary:'Guardado', detail:'Guardado con exito,para que sean visibles los cambios reinicia la pagina '});

  }


  getpedidosUser(id) {
    this.pedidosService.getallByCliente(id).subscribe(res => {
      this.listapedido = res;
      console.log(res);
    });
  }

  getAllPedidos() {
    this.pedidosService.getallByAdmin().subscribe(res => {
      this.listapedido = res;
      console.log(res);
    });
  }


  deletePedido(algo) {

    this.pedidosService.deleteEspecificaciones(algo);
    setTimeout(() => {
      this.pedidosService.deletePedido(algo).subscribe(async res => {
        console.log(res);
        if (res) {
          for (let i = 0; i < this.listapedido.length; i++) {
            algo.codpedido = this.listapedido[i].codpedido;

            console.log(this.listapedido)
          }
          this.cargarpedidos();
        }
      });
    }, 100);

  }
  changeCard(any) {
    this.card = any;
  }
  Verpedido(number) {
    this.router.navigate(["/pedido/" + number])
  }

}
