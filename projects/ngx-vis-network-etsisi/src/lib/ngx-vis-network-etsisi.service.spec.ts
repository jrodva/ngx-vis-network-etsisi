import { TestBed } from '@angular/core/testing';

import { NgxVisNetworkEtsisiService } from './ngx-vis-network-etsisi.service';

describe('NgxVisNetworkEtsisiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxVisNetworkEtsisiService = TestBed.get(NgxVisNetworkEtsisiService);
    expect(service).toBeTruthy();
  });
});
