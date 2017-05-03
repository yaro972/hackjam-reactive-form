import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'hb-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  toggleNavMenu = false;

  logo = 'http://static1.squarespace.com/static/57b995c42994cac731af81e2/' +
    't/57dc6fac6a49637fdbf20f92/1489060595275/?format=1500w';

  constructor() {
  }

  ngOnInit() {
  }

  showNavMenuOnMobile() {
    this.toggleNavMenu = !this.toggleNavMenu;
  }

}
