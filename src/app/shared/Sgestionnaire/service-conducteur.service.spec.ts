import { TestBed } from '@angular/core/testing';

import { ServiceConducteurService } from './service-conducteur.service';

describe('ServiceConducteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceConducteurService = TestBed.get(ServiceConducteurService);
    expect(service).toBeTruthy();
  });
});
