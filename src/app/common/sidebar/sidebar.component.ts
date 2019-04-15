import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }


  
  CerrarSesion(){
    sessionStorage.removeItem("Usuario");
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

}
