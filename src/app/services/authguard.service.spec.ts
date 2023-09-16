import { TestBed } from '@angular/core/testing';

import { AuthguardService } from './authguard.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

describe('AuthguardService', () => {
  let service: AuthguardService;
  const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getDataFromSession']);
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        {provide: Router, useValue: router}
      ]
    });
    service = TestBed.inject(AuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should activate the route/page when there is a valid userid', () => {
    storageServiceSpy.getDataFromSession.and.returnValue(true);
    expect(service.canActivate()).toBe(true);
  });

  it('should not activate the route/page when there is no userid', () => {
    storageServiceSpy.getDataFromSession.and.returnValue(false);
    expect(service.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/signup']);
  });
});
