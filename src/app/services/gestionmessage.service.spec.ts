import { TestBed } from '@angular/core/testing';

import { GestionmessageService } from './gestionmessage.service';

describe('GestionmessageService', () => {
  let service: GestionmessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionmessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
