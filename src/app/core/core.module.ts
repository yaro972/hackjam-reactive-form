import {NgModule} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {ConnectionBackend, Http, XHRBackend} from '@angular/http';
import {HttpService} from './http-service';

@NgModule({
  imports: [],
  providers: [
    AuthenticationService,
    {
      provide: ConnectionBackend,
      useClass: XHRBackend
    },
    HttpService,
    {
      provide: Http,
      useClass: HttpService
    },
  ],
  declarations: []
})
export class CoreModule {
}
