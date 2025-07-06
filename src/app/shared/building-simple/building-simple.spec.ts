import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingSimple } from './building-simple';

describe('BuildingSimple', () => {
  let component: BuildingSimple;
  let fixture: ComponentFixture<BuildingSimple>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingSimple]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingSimple);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
