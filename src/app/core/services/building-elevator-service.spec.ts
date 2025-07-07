import { TestBed } from '@angular/core/testing';

import { BuildingElevatorService } from './building-elevator-service';

describe('BuildingElevatorService', () => {
  let service: BuildingElevatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingElevatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
