import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauAnnonceComponent } from './tableau-annonce.component';

describe('TableauAnnonceComponent', () => {
  let component: TableauAnnonceComponent;
  let fixture: ComponentFixture<TableauAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableauAnnonceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
