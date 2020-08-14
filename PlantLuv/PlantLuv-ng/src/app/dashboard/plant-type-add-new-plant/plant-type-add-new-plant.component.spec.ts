import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantTypeAddNewComponent } from './plant-type-add-new-plant.component';

describe('PlantTypeAddNewComponent', () => {
  let component: PlantTypeAddNewComponent;
  let fixture: ComponentFixture<PlantTypeAddNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlantTypeAddNewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantTypeAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
