import { PedidosService } from './../../services/pedidos.service';
import { User } from 'src/app/model/Usuario';
import { element } from 'protractor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as jsPDF from 'jspdf';
import { discardPeriodicTasks } from '@angular/core/testing';
import html2canvas from 'html2canvas';  
import { Especificaciones } from 'src/app/model/Especificaciones';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  User;
  Pedido;
  listaEspecificaciones:Array<Especificaciones> =[];

  constructor(private rutaActiva: ActivatedRoute,private _route: ActivatedRoute,private pedidosService:PedidosService) { }

  ngOnInit() {
    console.log(this.rutaActiva.snapshot.params.id);
    this.cargarPedido();
  }

  @ViewChild('content') content:ElementRef;
  downloadPDF(){
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }
  cargarPedido(){
    this.pedidosService.getallByPedido(this._route.snapshot.paramMap.get('id')).subscribe(res =>{
      this.Pedido = res[0];
      console.log( res[0]);
      this.pedidosService.getEspecificacionesByPedido(this.Pedido.codpedido).subscribe(res =>{
        this.listaEspecificaciones=res;
        console.log(res,"Especificaciones");
      });
    });
    
  }

}
