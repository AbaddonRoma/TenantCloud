import { TestBed, inject } from '@angular/core/testing';

import { WebsiteService } from './shared.service';

describe('WebsiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsiteService]
    });
  });

  it('should be created', inject([WebsiteService], (service: WebsiteService) => {
    expect(service).toBeTruthy();
  }));
});
