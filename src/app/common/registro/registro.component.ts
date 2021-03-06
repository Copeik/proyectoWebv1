import { Router } from '@angular/router';
import { Cliente } from './../../model/Cliente';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
formRegistro: FormGroup = null;
equalPassword:boolean = false;
usuarioUnico:boolean = null;
spinner= false;

  constructor(private fb: FormBuilder,private authenticationService:AuthenticationService,private router:Router) {
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
      contrasena2:['',Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      direccion:['',Validators.required],
    })
   }

  ngOnInit() {
  }

  VerEstado(){
    this.checkPasswords();
    console.log(this.formRegistro)
    this.checkUser();
  }
  checkPasswords() { // here we have the 'passwords' group
  let pass = this.formRegistro.controls.contrasena.value;
  let confirmPass = this.formRegistro.controls.contrasena2.value;
  if (pass === confirmPass) {
    this.equalPassword =true; 
  }
  
     
}
checkUser(){
  
  var usuario=(<HTMLInputElement>document.getElementById("usuario")).value;
  this.authenticationService.checkuser(usuario).subscribe( res => {
    if (res != null) {
      console.log("entro")
      console.log(res,"res")
      if (res.usuario == usuario) {
        console.log("entro2")
        this.usuarioUnico = false;
        this.spinner= false
      }else{
        this.usuarioUnico = true;
      }
    }
  else{
    this.usuarioUnico=true;
  }})
    }

    guardarUsuario(){
      //Guardado de datos de usuario
    var cliente= new Cliente();
    var datos =this.formRegistro.value;
    cliente.activo=1;
    cliente.contrasena = datos.contrasena;
    cliente.correo = datos.correo;
    var direccion=Object();
        direccion.direc=datos.direccion;
    cliente.dir=direccion;
    var rol=Object();
        rol.id_rol=1;
    cliente.rol=rol;
    cliente.telefono=datos.telefono;
    cliente.usuario= datos.usuario;
    cliente.nombre= datos.nombre;
    cliente.apellidos= datos.apellidos;

    console.log(cliente);
          this.authenticationService.guardarUsuario(cliente);
          this.router.navigate(["/login"]);
          alert("Registrado con exito :D")
    }
    
}
  

  // ValidarFormulario(){
  //   this.Vnombre=((<HTMLInputElement>document.getElementById("nombre")).value)
  //   this.Vdireccion=((<HTMLInputElement>document.getElementById("nombre")).value)
  //   this.Vcorreo=((<HTMLInputElement>document.getElementById("nombre")).value)
  //   this.Vcontrasena=((<HTMLInputElement>document.getElementById("nombre")).value)
  //   this.Vcontrasena2=((<HTMLInputElement>document.getElementById("nombre")).value)
  //   this.Vapellido=((<HTMLInputElement>document.getElementById("nombre")).value)
    
  //   this.user_data = new FormGroup({
  //     username: new FormControl('agustin', Validators.required),
  //     city: new FormControl('Montevideo', Validators.required)
  //  });
  //   if (this.Vnombre == null || this.Vnombre == undefined || this.Vnombre == "" ) {
      
  //   }

    
  // }


