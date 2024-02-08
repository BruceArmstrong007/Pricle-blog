import { TestBed } from '@angular/core/testing';

import { PostCreaterOptionsService } from './post-creater-options.service';

describe('PostCreaterOptionsService', () => {
  let service: PostCreaterOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCreaterOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
