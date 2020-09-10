import { TestBed } from '@angular/core/testing';

import { BeneficiareService } from './beneficiare.service';

describe('BeneficiareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeneficiareService = TestBed.get(BeneficiareService);
    expect(service).toBeTruthy();
  });
});
