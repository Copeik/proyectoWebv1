import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#myCarousel').carousel({
      interval: 5000
    });
    
    $('.carousel .item').each(function() {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':nth-child(1)').clone().appendTo($(this));
    
      if (next.next().length > 0) {
    
        next.next().children(':first-child').clone().appendTo($(this)).addClass('rightest');
    
      } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    
      }
    });-
  }

}
