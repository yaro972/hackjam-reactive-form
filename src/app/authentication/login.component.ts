import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/authentication.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {unsubscribeAll} from '../utils';
import {NgForm} from '@angular/forms';
import {LoginCredentials} from './types';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public email: string;
  public password: string;

  subscriptions: Subscription[] = [];
  controls: LoginCredentials;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login(f: NgForm) {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials)
      .map((token: string) => {
        this.redirectToHome();
      })
      .catch((error) => {
        console.log('error login', error);
        return Observable.empty();
      }).subscribe(

    );
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }

  onChange(f: NgForm) {
    this.email = f.value['email'];
    this.password = f.value['password'];
  }
}
