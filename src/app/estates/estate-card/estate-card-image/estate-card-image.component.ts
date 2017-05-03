import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hb-estate-card-image',
  templateUrl: './estate-card-image.component.html',
  styleUrls: ['./estate-card-image.component.css']
})
export class EstateCardImageComponent implements OnInit {
  @Input()
  picture: string;

  constructor() {
  }

  ngOnInit() {
  }

}
