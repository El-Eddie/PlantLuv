import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTypeDashboardComponent } from './plant-type-dashboard.component';

describe('PlantTypeDashboardComponent', () => {
  let component: PlantTypeDashboardComponent;
  let fixture: ComponentFixture<PlantTypeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlantTypeDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantTypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
