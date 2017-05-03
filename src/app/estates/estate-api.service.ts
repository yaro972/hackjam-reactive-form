import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {API_URL, Estate} from '../types';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';

@Injectable()
export class EstateApiService {
  uri = 'estates/';

  constructor(private http: Http, @Inject(API_URL) private baseApiUrl) {
  }

  getEstates(): Observable<Estate[]> {
    const url = `${this.baseApiUrl}${this.uri}`;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch((response: Response) => {
        return Observable.throw(response);
      })
  }
}
