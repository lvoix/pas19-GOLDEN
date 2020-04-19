import { TestBed } from '@angular/core/testing';

import { ServiceGeneralService } from './service-general.service';

describe('ServiceGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceGeneralService = TestBed.get(ServiceGeneralService);
    expect(service).toBeTruthy();
  });
});
