import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'proyectoWebv1';
  sidebar = false;
  ngOnInit(){
    this.ComprobarLoged();
  }
  ComprobarLoged(){
    
    var user=sessionStorage.getItem("Usuario");
    
    if(user!=null || user != undefined){
      this.sidebar=true;  
    }
      
  }
}
