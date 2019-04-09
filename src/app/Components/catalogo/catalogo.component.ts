import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  items=[1,2,3,4,5,6,7,8,9,10,11,12]

  constructor() { }

  ngOnInit() {
  }

}
