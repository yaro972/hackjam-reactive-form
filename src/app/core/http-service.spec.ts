// /* tslint:disable:no-unused-variable */
// import {fakeAsync, inject, TestBed} from '@angular/core/testing';
// import {MockBackend, MockConnection} from '@angular/http/testing';
// import {AppContext} from './app.context';
// import {HttpService} from './http-service';
// import {BaseRequestOptions, Headers, Http, Response, ResponseOptions} from '@angular/http';
// import {AbsTokenState} from '../state/abs-token/abs-token.state.service';
// import {AbsToken} from '../state/abs-token/abs-token.reducer';
// import {appContextTestProvider} from './app.context.spec';
// import {absTokenStateTestProvider} from '../state/abs-token/abs-token.state.service.spec';
//
// describe('Http Service', () => {
//   interface SetupReturnValue {
//     currentLanguageReturnValue?;
//     environmentReturnValue?;
//     absTokenGetDataSyncReturnValue?;
//     absTokenAlreadyStoredReturnValue?;
//   }
//
//   function setup(params?: SetupReturnValue) {
//     const http = TestBed.get(HttpService);
//     const backend = TestBed.get(MockBackend);
//     const context = TestBed.get(AppContext);
//     const absTokenState = TestBed.get(AbsTokenState);
//     if (params) {
//       context.getLocalSync.and.returnValue(params.currentLanguageReturnValue);
//       context.getEnvironmentVariables.and.returnValue(params.environmentReturnValue);
//       absTokenState.getDataSync.and.returnValue(params.absTokenGetDataSyncReturnValue);
//       absTokenState.hasNotCachedTokens.and.returnValue(params.absTokenAlreadyStoredReturnValue);
//     }
//     return {
//       absTokenState,
//       http,
//       backend
//     };
//   }
//
//   const environment = {
//     DISPATCHER_URL: 'http://localhost:3000/api/verkenner',
//   };
//
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [],
//     providers: [
//       MockBackend,
//       BaseRequestOptions,
//       {
//         provide: HttpService,
//         deps: [MockBackend, BaseRequestOptions, AppContext, AbsTokenState],
//         useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions,
//                      context: AppContext, absTokenState: AbsTokenState) => {
//           return new HttpService(backend, defaultOptions, context, null, absTokenState);
//         }
//       },
//       {
//         provide: Http,
//         useClass: HttpService
//       },
//       appContextTestProvider(),
//       absTokenStateTestProvider()
//     ]
//   }));
//
//   const LOCAL_HEADER_KEY = HttpService.LOCAL_HEADER_KEY;
//   const ABS_BEARER_HEADER_KEY = HttpService.ABS_BEARER_HEADER_KEY;
//   const ABS_INSTANCE_HEADER_KEY = HttpService.ABS_INSTANCE_HEADER_KEY;
//
//   const setupKeyHeaderTest = function (httpMethod: string, currentLanguage = 'en_BE',
//                                        bearerTokenValue = 'bearer-key', instanceTokenValue = 'instance-key') {
//     const currentLanguageReturnValue = 'en_BE';
//     const absTokenGetDataSyncReturnValue = {
//       bearer: 'bearer-key',
//       instance: 'instance-key'
//     };
//     const setupParams = {
//       environmentReturnValue: environment,
//       absTokenGetDataSyncReturnValue,
//       currentLanguageReturnValue
//     };
//     const { backend, http } = setup(setupParams);
//
//     backend.connections.subscribe((connection: MockConnection) => {
//       expect(connection.request.headers.get(LOCAL_HEADER_KEY)).toBeTruthy();
//       expect(connection.request.headers.get(LOCAL_HEADER_KEY)).toEqual(currentLanguageReturnValue);
//
//       expect(connection.request.headers.get(ABS_BEARER_HEADER_KEY)).toBeTruthy();
//       expect(connection.request.headers.get(ABS_BEARER_HEADER_KEY))
//         .toEqual(absTokenGetDataSyncReturnValue.bearer);
//
//       expect(connection.request.headers.get(ABS_INSTANCE_HEADER_KEY)).toBeTruthy();
//       expect(connection.request.headers.get(ABS_INSTANCE_HEADER_KEY))
//         .toEqual(absTokenGetDataSyncReturnValue.instance);
//
//     });
//
//     http[httpMethod](environment.DISPATCHER_URL).subscribe();
//   };
//
//   const setupCachingTest = function (tokenAlreadyCached: boolean, backendResponseToken: AbsToken) {
//     const currentLanguageReturnValue = 'en_BE';
//     const absTokenGetDataSyncReturnValue = {
//       bearer: '',
//       instance: ''
//     };
//     const setupParams = {
//       environmentReturnValue: environment,
//       absTokenAlreadyStoredReturnValue: tokenAlreadyCached,
//       absTokenGetDataSyncReturnValue,
//       currentLanguageReturnValue
//     };
//     const { backend, http, absTokenState } = setup(setupParams);
//
//     backend.connections.subscribe((connection: MockConnection) => {
//       const headers = new Headers();
//       headers.append(ABS_BEARER_HEADER_KEY, backendResponseToken.bearer);
//       headers.append(ABS_INSTANCE_HEADER_KEY, backendResponseToken.instance);
//       const response = new ResponseOptions({ headers });
//       connection.mockRespond(new Response(response));
//     });
//
//     http.request(environment.DISPATCHER_URL).subscribe();
//   };
//   it('should be defined', inject([HttpService], (service: HttpService) => {
//     expect(service).toBeTruthy();
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for REQUEST method`, fakeAsync(() => {
//     setupKeyHeaderTest('request');
//   }));
//
//   it(`should not cache the ${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header when tokens was already cached`, fakeAsync(() => {
//     const { absTokenState } = setup();
//     const backendResponseToken = {
//       bearer: 'received-bearer-key',
//       instance: 'received-instance-key'
//     };
//     setupCachingTest(false, backendResponseToken);
//     expect(absTokenState.cacheTokens).not.toHaveBeenCalledWith(backendResponseToken);
//   }));
//   it(`should  cache the ${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header when tokens was not already cached`, fakeAsync(() => {
//     const { absTokenState } = setup();
//     const backendResponseToken = {
//       bearer: 'received-bearer-key',
//       instance: 'received-instance-key'
//     };
//     setupCachingTest(true, backendResponseToken);
//     expect(absTokenState.cacheTokens).toHaveBeenCalledWith(backendResponseToken);
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for GET Http`, fakeAsync(() => {
//     setupKeyHeaderTest('get');
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for POST Http`, fakeAsync(() => {
//     setupKeyHeaderTest('post');
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for PUT Http`, fakeAsync(() => {
//     setupKeyHeaderTest('put');
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for DELETE Http`, fakeAsync(() => {
//     setupKeyHeaderTest('delete');
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for PATCH Http`, fakeAsync(() => {
//     setupKeyHeaderTest('patch');
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for HEAD Http`, fakeAsync(() => {
//     setupKeyHeaderTest('head');
//   }));
//
//   it(`should add the ${LOCAL_HEADER_KEY}/${ABS_BEARER_HEADER_KEY}/${ABS_INSTANCE_HEADER_KEY} header for OPTIONS Http`, fakeAsync(() => {
//     setupKeyHeaderTest('options');
//   }));
// });
