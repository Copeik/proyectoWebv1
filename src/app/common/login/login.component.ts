import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthenticationService) {

  }
  Login() {
    console.log("you are logging in")
    this.authService.login(this.email, this.password).subscribe(res => {
      console.log('hola')
    })

  }

  ngOnInit() { }
}