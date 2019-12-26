import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {API_URL} from '../types';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private uri = 'login';
  static AUTH_TOKEN_KEY = 'hb-token';
  private authToken;

  constructor(private http: Http, @Inject(API_URL) private baseApiUrl) {
    this.authToken = AuthenticationService.getAuthTokenFromLocalStorage();
  }

  login(credentials: { email: string, password: string }): Observable<string> {
    const url = `${this.baseApiUrl}${this.uri}`;
    return this.http.post(url, credentials)
      .map((response: Response) => response.json())
      .map((response: { token: string }) => {
        // save to localstorage
        localStorage.setItem(AuthenticationService.AUTH_TOKEN_KEY, response.token);
        this.authToken = response.token;
        return response.token;
      })
      .catch((response: Response) => {
        return Observable.throw(response);
      });
  }

  isAuthenticated() {
    return !!this.authToken;
  }

  logout() {
    this.authToken = null;
    AuthenticationService.removeAuthTokenFromLocalStorage();
  }

  getAuthToken() {
    return this.authToken;
  }

  static getAuthTokenFromLocalStorage() {
    return localStorage.getItem(AuthenticationService.AUTH_TOKEN_KEY);
  }

  static removeAuthTokenFromLocalStorage() {
    localStorage.removeItem(AuthenticationService.AUTH_TOKEN_KEY);
  }
}
