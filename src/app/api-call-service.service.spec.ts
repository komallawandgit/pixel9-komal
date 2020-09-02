import { TestBed, inject } from '@angular/core/testing';

import { ApiCallServiceService } from './api-call-service.service';

describe('ApiCallServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCallServiceService]
    });
  });

  it('should be created', inject([ApiCallServiceService], (service: ApiCallServiceService) => {
    expect(service).toBeTruthy();
  }));
});
