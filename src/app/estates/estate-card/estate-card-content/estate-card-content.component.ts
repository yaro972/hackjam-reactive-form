import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../../types';

@Component({
  selector: 'hb-estate-card-content',
  templateUrl: './estate-card-content.component.html',
  styleUrls: ['./estate-card-content.component.css']
})
export class EstateCardContentComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  userName: string;

  @Input()
  userPicture: string;

  @Input()
  roomType: string;

  @Input()
  location: Location;

  constructor() {
  }

  ngOnInit() {
  }

}
