import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ConnectionBackend, Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class HttpService extends Http {
  static AUTH_HEADER_KEY = 'Authorization';

  constructor(backend: ConnectionBackend,
              options: RequestOptions,
              private router: Router) {
    super(backend, options);
  }

  private addHeaders(options) {
    const authToken = this.getAuthTokenFromLocalStorage();
    const headerOptions = new RequestOptions({
      headers: new Headers(
        {
          [HttpService.AUTH_HEADER_KEY]: 'Bearer ' + authToken,
        }
      )
    });
    return headerOptions.merge(options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    return this.handleServerDownTime(super.request(url, this.addHeaders(options)));

  }

  private getAuthTokenFromLocalStorage() {
    return localStorage.getItem(AuthenticationService.AUTH_TOKEN_KEY);
  }

  private handleServerDownTime(request: Observable<Response>) {
    return request.catch((err, source) => {

        if (err.status === 401) {
          AuthenticationService.removeAuthTokenFromLocalStorage();
          this.router.navigate(['/login']);
          return Observable.empty();
        }

        // http status 0 corresponds to backend down
        if (err.status === 0) {
          // TODO create error page and redirect to it
          this.router.navigate(['/error']);
          return Observable.empty();
        }

        return Observable.throw(err);
      }
    );
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.addHeaders(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.addHeaders(options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.addHeaders(options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.addHeaders(options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.patch(url, body, this.addHeaders(options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.head(url, this.addHeaders(options));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.options(url, this.addHeaders(options));
  }
}
