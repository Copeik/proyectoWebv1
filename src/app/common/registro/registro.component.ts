import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
formRegistro: FormGroup;
equalPassword:boolean = false;


  constructor(private fb: FormBuilder) {
    this.formRegistro = this.fb.group({
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      correo:['',Validators.compose([
        Validators.required,
        Validators.email
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
    
  }
  checkPasswords() { // here we have the 'passwords' group
  let pass = this.formRegistro.controls.contrasena.value;
  let confirmPass = this.formRegistro.controls.contrasena2.value;
  if (pass === confirmPass) {
    this.equalPassword =true; 
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

}
