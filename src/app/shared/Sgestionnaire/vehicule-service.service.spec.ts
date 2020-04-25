import { TestBed } from '@angular/core/testing';

import { VehiculeServiceService } from './vehicule-service.service';

describe('VehiculeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehiculeServiceService = TestBed.get(VehiculeServiceService);
    expect(service).toBeTruthy();
  });
});
