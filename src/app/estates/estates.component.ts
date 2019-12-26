import {Component, OnInit} from '@angular/core';
import {EstateApiService} from './estate-api.service';
import {chunk} from '../utils';

@Component({
  selector: 'hb-estates',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.css']
})
export class EstatesComponent implements OnInit {

  public filteredEstates = [];
  public estates = [];

  constructor(private estateApiService: EstateApiService) {
  }

  ngOnInit() {
    this.estateApiService.getEstates().subscribe(estates => {
      this.estates = estates;
      this.updateEstate(estates);
    });
  }

  updateEstate(estates) {
    this.filteredEstates = chunk(estates, 3);
  }

}
