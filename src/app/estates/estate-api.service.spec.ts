import {fakeAsync, inject, TestBed} from '@angular/core/testing';

import {EstateApiService} from './estate-api.service';
import {BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {API_URL} from '../types';

describe('EstateApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EstateApiService,
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
    const estateApiService = TestBed.get(EstateApiService);
    const backend = TestBed.get(MockBackend);

    if (params) {
    }

    return {
      estateApiService,
      backend
    };
  }

  const estatesResponse = [
    {
      "title": " COLOSSEUM TERMINI B&B NILI RED",
      "roomType": "private_room",
      "pictureUrl": "http://lorempixel.com/800/600/city/",
      "maxGuestAccepted": 8,
      "pricePerNight": 484,
      "userInfo": {
        "location": {
          "street": "1946 main street",
          "city": "ashbourne",
          "state": "south dublin",
          "postCode": 71078
        },
        "email": "frank.omahony@example.com",
        "registered": "2016-07-18 13:02:34",
        "phone": "011-456-1046",
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/31.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/31.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/31.jpg"
        },
        "nationality": "IE",
        "dateOfBirth": "1983-01-21",
        "name": "frank omahony",
        "id": "PPS-0190714T"
      }
    },
    {
      "title": "MARAIS: Unique studio with GARDEN",
      "roomType": "entire_home",
      "pictureUrl": "http://lorempixel.com/800/600/food/",
      "maxGuestAccepted": 1,
      "pricePerNight": 110,
      "userInfo": {
        "location": {
          "street": "6760 north road",
          "city": "celbridge",
          "state": "cork",
          "postCode": 93367
        },
        "email": "curtis.freeman@example.com",
        "registered": "2005-06-29 03:06:31",
        "phone": "021-023-4857",
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/91.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/91.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/91.jpg"
        },
        "nationality": "IE",
        "dateOfBirth": "1969-01-09",
        "name": "curtis freeman",
        "id": "PPS-5444652T"
      }
    },
    {
      "title": " COLOSSEUM TERMINI B&B NILI RED",
      "roomType": "shared_room",
      "pictureUrl": "http://lorempixel.com/800/600/food/",
      "maxGuestAccepted": 3,
      "pricePerNight": 632,
      "userInfo": {
        "location": {
          "street": "5010 the green",
          "city": "chichester",
          "state": "wiltshire",
          "postCode": "V8 8AE"
        },
        "email": "fernando.newman@example.com",
        "registered": "2003-09-30 14:08:47",
        "phone": "0101 959 7815",
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/32.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/32.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/32.jpg"
        },
        "nationality": "GB",
        "dateOfBirth": "1980-03-15",
        "name": "fernando newman",
        "id": "NINO-EC 76 07 83 P"
      }
    },
    {
      "title": "Charming room in spacious apartment",
      "roomType": "entire_home",
      "pictureUrl": "http://lorempixel.com/800/600/nature/",
      "maxGuestAccepted": 11,
      "pricePerNight": 797,
      "userInfo": {
        "location": {
          "street": "5550 rue des ecrivains",
          "city": "pully",
          "state": "schwyz",
          "postCode": 4744
        },
        "email": "mahé.richard@example.com",
        "registered": "2015-03-24 01:54:07",
        "phone": "(072)-711-3093",
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/88.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/88.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/88.jpg"
        },
        "nationality": "CH",
        "dateOfBirth": "1993-04-10",
        "name": "mahé richard",
        "id": "AVS-756.DQAA.SOWQ.77"
      }
    },
    {
      "title": "Charming room in spacious apartment",
      "roomType": "entire_home",
      "pictureUrl": "http://lorempixel.com/800/600/nature/",
      "maxGuestAccepted": 12,
      "pricePerNight": 662,
      "userInfo": {
        "location": {
          "street": "5144 kapelstraat",
          "city": "leiderdorp",
          "state": "noord-brabant",
          "postCode": 25655
        },
        "email": "jeffry.bokkers@example.com",
        "registered": "2006-09-20 16:49:40",
        "phone": "(918)-272-7144",
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/82.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/82.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/82.jpg"
        },
        "nationality": "NL",
        "dateOfBirth": "1982-09-14",
        "name": "jeffry bokkers",
        "id": "BSN-46978086"
      }
    },
  ];

  it('should be defined', inject([EstateApiService], (service: EstateApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('getEstates', () => {

    it('should perform a GET request ', fakeAsync(() => {
      const { backend, estateApiService } = setup();
      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
      });

      estateApiService.getEstates().subscribe();
    }));

    const url = 'http://localhost:3000/estates';
    it('should perform a request to url:' + url, fakeAsync(() => {
      const { backend, estateApiService } = setup();
      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url).toContain(url);
      });

      estateApiService.getEstates().subscribe();

    }));

    it('should return all estates ', fakeAsync(() => {
      const { backend, estateApiService } = setup();

      backend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({
          body: JSON.stringify(estatesResponse),
          status: 200
        });
        connection.mockRespond(new Response(response));
      });

      let results;
      estateApiService.getEstates().subscribe(estates => results = estates);
      expect(results).toEqual(estatesResponse);

    }));
  });
});
