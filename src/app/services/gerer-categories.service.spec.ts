import { TestBed } from '@angular/core/testing';

import { GererCategoriesService } from './gerer-categories.service';

describe('GererCategoriesService', () => {
  let service: GererCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GererCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
