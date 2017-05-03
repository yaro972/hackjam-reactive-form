import {Component, Input, OnInit} from '@angular/core';
import {Estate} from '../../types';

@Component({
  selector: 'hb-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent implements OnInit {
  @Input()
  estate: Estate;

  constructor() {
  }

  ngOnInit() {
  }

}
