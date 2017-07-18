import { TestBed, inject } from '@angular/core/testing';

import { VehInfoService } from './veh-info.service';

describe('VehInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehInfoService]
    });
  });

  it('should be created', inject([VehInfoService], (service: VehInfoService) => {
    expect(service).toBeTruthy();
  }));
});
