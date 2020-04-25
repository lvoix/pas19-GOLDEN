import { TestBed } from '@angular/core/testing';

import { EntitesServiceService } from './entites-service.service';

describe('EntitesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntitesServiceService = TestBed.get(EntitesServiceService);
    expect(service).toBeTruthy();
  });
});
