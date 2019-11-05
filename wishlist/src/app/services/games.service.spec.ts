import { TestBed } from '@angular/core/testing';
import {GamesService} from './games.service.';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Game} from '../models/game.model';


describe('GamesService', () => {
  let service: GamesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GamesService
      ],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(GamesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return games', () => {
    const response = {
      1: {
        name: "Saints Row 2",
        price: 49,
        cover: "http://s.gama-gama.ru/fullsize/e56c325f30f3d01b0f0f1ea8d5b59d70.jpg"
      },
      2: {
        name: "Super Meat Boy",
        price: 95,
        cover: "http://s.gama-gama.ru/fullsize/55ec56700fb25cea5bac845490b8551a.jpg"
      }
    };

    const expected = [
      new Game("1", "Saints Row 2", 49, "http://s.gama-gama.ru/fullsize/e56c325f30f3d01b0f0f1ea8d5b59d70.jpg"),
      new Game("2", "Super Meat Boy", 95, "http://s.gama-gama.ru/fullsize/55ec56700fb25cea5bac845490b8551a.jpg")
    ];

    service.search().subscribe(actual => {
      expect(actual).toEqual(expected);
    });

    const request = httpTestingController.expectOne('assets/products.json');

    expect(request.request.method).toEqual('GET');

    request.flush(response);

    httpTestingController.verify();
  });
});
