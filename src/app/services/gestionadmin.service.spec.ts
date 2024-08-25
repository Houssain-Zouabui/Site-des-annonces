import { TestBed } from '@angular/core/testing';

import { GestionadminService } from './gestionadmin.service';

describe('GestionadminService', () => {
  let service: GestionadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
