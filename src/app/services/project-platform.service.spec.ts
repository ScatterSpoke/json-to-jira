import { TestBed, inject } from '@angular/core/testing';

import { ProjectPlatformService } from './project-platform.service';

describe('ProjectPlatformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectPlatformService]
    });
  });

  it('should be created', inject([ProjectPlatformService], (service: ProjectPlatformService) => {
    expect(service).toBeTruthy();
  }));
});
