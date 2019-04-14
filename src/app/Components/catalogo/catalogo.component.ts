import { Component, OnInit } from '@angular/core';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  items:any;
  page:number=0;
  pages:Array<number>;

  constructor(private articulosService:ArticulosService) { }

  ngOnInit() {
    this.getArticulos();
  }

  getArticulos(){
    this.articulosService.getListaArticulos(this.page).subscribe(res => {
    this.items=res;
    this.pages = new Array(res['totalPages']);
    });
  }
  setPage(page){
    this.page=page;
    this.getArticulos();
  }
}
