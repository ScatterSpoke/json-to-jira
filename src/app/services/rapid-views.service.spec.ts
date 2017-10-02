import { TestBed, inject } from '@angular/core/testing';

import { RapidViewsService } from './rapid-views.service';

describe('RapidViewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapidViewsService]
    });
  });

  it('should be created', inject([RapidViewsService], (service: RapidViewsService) => {
    expect(service).toBeTruthy();
  }));
});
