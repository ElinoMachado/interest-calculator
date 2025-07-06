import { TestBed } from '@angular/core/testing';

import { SystemInfo } from './system-info';

describe('SystemInfo', () => {
  let service: SystemInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
