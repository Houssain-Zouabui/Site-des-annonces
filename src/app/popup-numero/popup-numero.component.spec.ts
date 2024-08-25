import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNumeroComponent } from './popup-numero.component';

describe('PopupNumeroComponent', () => {
  let component: PopupNumeroComponent;
  let fixture: ComponentFixture<PopupNumeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupNumeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupNumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
