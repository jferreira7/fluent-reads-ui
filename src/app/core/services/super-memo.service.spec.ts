import { TestBed } from '@angular/core/testing';

import { SuperMemoService } from './super-memo.service';

describe('SuperMemoService', () => {
  let service: SuperMemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperMemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
