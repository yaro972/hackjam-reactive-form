import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {EstateMockInjectionToken, mock} from './mocks/estates.mock';
import {EstatesModule} from './estates/estates.module';
import {API_URL} from './types';
import {AppRoutingModule} from './app.routing.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {SharedModule} from './shared-module/shared.module';
import {CoreModule} from './core/core.module';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    EstatesModule,
    AuthenticationModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: EstateMockInjectionToken,
      useValue: mock
    },
    {
      provide: API_URL,
      useValue: 'http://localhost:3000/'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
