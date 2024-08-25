import { TestBed } from '@angular/core/testing';

import { GestionannonceService } from './gestionannonce.service';

describe('GestionannonceService', () => {
  let service: GestionannonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionannonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
