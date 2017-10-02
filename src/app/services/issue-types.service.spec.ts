import { TestBed, inject } from '@angular/core/testing';

import { IssueTypesService } from './issue-types.service';

describe('IssueTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueTypesService]
    });
  });

  it('should be created', inject([IssueTypesService], (service: IssueTypesService) => {
    expect(service).toBeTruthy();
  }));
});
