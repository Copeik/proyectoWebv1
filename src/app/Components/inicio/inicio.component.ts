import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private auth:AuthenticationService) { }

  ngOnInit() {
    //asi volvemos a el login si nos estamos logeados
    this.auth.getuser();
  }


}
