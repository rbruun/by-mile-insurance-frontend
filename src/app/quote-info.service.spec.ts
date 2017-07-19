import { TestBed, inject } from '@angular/core/testing';

import { QuoteInfoService } from './quote-info.service';

describe('QuoteInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteInfoService]
    });
  });

  it('should be created', inject([QuoteInfoService], (service: QuoteInfoService) => {
    expect(service).toBeTruthy();
  }));
});
