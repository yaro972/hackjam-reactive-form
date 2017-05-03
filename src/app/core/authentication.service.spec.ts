import {fakeAsync, inject, TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions} from '@angular/http';
import {API_URL} from '../types';
import {LoginCredentials} from '../authentication/types';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: API_URL,
          useValue: 'http://localhost:3000/'
        },
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
      ]
    });
  });

  function setup(params?: any) {
    const authenticationService = TestBed.get(AuthenticationService);
    const backend = TestBed.get(MockBackend);

    if (params) {
    }

    return {
      authenticationService,
      backend
    };
  }

  it('should be defined', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  describe('login()', () => {

    const credentials: LoginCredentials = {
      email: 'yolo@yolo.com',
      password: 'welcome@hva.nl'
    };

    const authToken = 'mySuperSecureToken';

    it('should perform a POST request ', fakeAsync(() => {
      const { backend, authenticationService } = setup();
      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
      });

      authenticationService.login().subscribe();
    }));

    const url = 'http://localhost:3000/login';
    it('should perform a request to url:' + url, fakeAsync(() => {
      const { backend, authenticationService } = setup();
      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url).toContain(url);
      });

      authenticationService.login().subscribe();

    }));

    it('should get an auth token ', fakeAsync(() => {
      const { backend, authenticationService } = setup();

      backend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({
          body: JSON.stringify({ token: authToken }),
          status: 200
        });
        connection.mockRespond(new Response(response));
      });

      let result;
      authenticationService.login(credentials).subscribe(token => result = token);
      expect(result).toEqual(authToken);

      authenticationService.logout();
    }));
  });
  describe('isAuthenticated()', () => {

    const credentials: LoginCredentials = {
      email: 'yolo@yolo.com',
      password: 'welcome@hva.nl'
    };

    const authToken = 'mySuperSecureToken';

    it('should return false when not authenticated', fakeAsync(() => {
      const { authenticationService } = setup();
      let result = authenticationService.isAuthenticated();
      expect(result).toBeFalsy();

    }));

    it('should return true when  authenticated', fakeAsync(() => {
      const { backend, authenticationService } = setup();

      backend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({
          body: JSON.stringify({ token: authToken }),
          status: 200
        });
        connection.mockRespond(new Response(response));
      });


      authenticationService.login(credentials).subscribe();
      let result = authenticationService.isAuthenticated();
      expect(result).toBeTruthy();

    }));
  });

  describe('logout()', () => {

    const credentials: LoginCredentials = {
      email: 'yolo@yolo.com',
      password: 'welcome@hva.nl'
    };

    const authToken = 'mySuperSecureToken';

    it('should delete authToken', fakeAsync(() => {
      const { backend, authenticationService } = setup();

      backend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({
          body: JSON.stringify({ token: authToken }),
          status: 200
        });
        connection.mockRespond(new Response(response));
      });

      authenticationService.login(credentials).subscribe();
      authenticationService.isAuthenticated();
      expect(authenticationService.isAuthenticated()).toBeTruthy();

      authenticationService.logout();

      expect(authenticationService.isAuthenticated()).toBeFalsy();

    }));
  });

  describe('getAuthToken()', () => {

    const credentials: LoginCredentials = {
      email: 'yolo@yolo.com',
      password: 'welcome@hva.nl'
    };

    const authToken = 'mySuperSecureToken';

    it('should return null after a logout', fakeAsync(() => {
      const { authenticationService } = setup();

      authenticationService.logout();

      expect(authenticationService.getAuthToken()).toBeFalsy();

    }));

    it('should return the auth token after a login', fakeAsync(() => {
      const { backend, authenticationService } = setup();

      backend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({
          body: JSON.stringify({ token: authToken }),
          status: 200
        });
        connection.mockRespond(new Response(response));
      });

      authenticationService.login(credentials).subscribe();
      expect(authenticationService.isAuthenticated()).toBeTruthy();
      expect(authenticationService.getAuthToken()).toEqual(authToken);

    }));
  });

});
