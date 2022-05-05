import { TestBed } from '@angular/core/testing';

import { DevicesConfigService } from './devices-config.service';

describe('DevicesConfigService', () => {
  let service: DevicesConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
