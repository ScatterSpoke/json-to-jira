import { TestBed, inject } from '@angular/core/testing';

import { TrelloClientService } from './trello-client.service';

describe('TrelloClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrelloClientService]
    });
  });

  it('should be created', inject([TrelloClientService], (service: TrelloClientService) => {
    expect(service).toBeTruthy();
  }));
});
