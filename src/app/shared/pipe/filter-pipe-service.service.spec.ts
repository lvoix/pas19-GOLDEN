import { TestBed } from '@angular/core/testing';

import { FilterPipeServiceService } from './filter-pipe-service.service';

describe('FilterPipeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterPipeServiceService = TestBed.get(FilterPipeServiceService);
    expect(service).toBeTruthy();
  });
});
