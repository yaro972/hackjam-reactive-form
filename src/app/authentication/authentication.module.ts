import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {SharedModule} from '../shared-module/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthenticationModule {
}
