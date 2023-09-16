import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setDataToSession to set userinfo to sessionStorage', () => {
    const mockResponse = {userId: '123user', message: ''};
    spyOn(window.sessionStorage, 'setItem').and.callFake(()=>{ return true});
    service.setDataToSession(mockResponse);
    expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should call getDataToSession to get userinfo from sessionStorage', () => {
    spyOn(window.sessionStorage, 'getItem').and.callFake(()=>{ return 'userId123'});
    expect(service.getDataFromSession()).toBe('userId123');
  });

});
