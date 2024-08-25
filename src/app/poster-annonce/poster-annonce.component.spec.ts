import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterAnnonceComponent } from './poster-annonce.component';

describe('PosterAnnonceComponent', () => {
  let component: PosterAnnonceComponent;
  let fixture: ComponentFixture<PosterAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosterAnnonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosterAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
