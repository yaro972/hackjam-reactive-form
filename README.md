# Angular Reactive Form

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


# TODO
  
* Fix errors authentication module
* Fix template errors of login.component.html
* You can enter any email and password, the login will work
* Fix errors of login.component.ts

* Fix templates errors of estate-card
* Add the line below in the estate.component.html after '<hb-nav-bar></hb-nav-bar>'
<hb-filter-section [estateToFilter]="estates" (onFiltersChange)="updateEstate($event)"></hb-filter-section>

* Fix template errors of filter section
* Implement filtering function in filter section component
* Implement Validators.min and Validators.max for price

* Transform Template Form of the login component into Reactive Form 
* Congratulations you finish everything. We have more work for you :)
