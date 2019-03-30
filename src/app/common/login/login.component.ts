import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = '';
  password = '';

  constructor(private authService: AuthenticationService) {

  }
  Login() {
    console.log("you are logging in")
    this.authService.login(this.user, this.password).subscribe(res => {
    })

  }

  ngOnInit() { }
}