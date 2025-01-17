import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsComponent } from './adds.component';

describe('AddsComponent', () => {
  let component: AddsComponent;
  let fixture: ComponentFixture<AddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
