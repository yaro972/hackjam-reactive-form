import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/authentication.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {unsubscribeAll} from '../utils';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string;
  password: string;

  subscriptions: Subscription[] = [];

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
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
      });
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }
}
