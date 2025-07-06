import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorInfo } from './elevator-info';

describe('ElevatorInfo', () => {
  let component: ElevatorInfo;
  let fixture: ComponentFixture<ElevatorInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevatorInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevatorInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
