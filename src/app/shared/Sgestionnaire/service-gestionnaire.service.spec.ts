import { TestBed } from '@angular/core/testing';

import { ServiceGestionnaireService } from './service-gestionnaire.service';

describe('ServiceGestionnaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceGestionnaireService = TestBed.get(ServiceGestionnaireService);
    expect(service).toBeTruthy();
  });
});
