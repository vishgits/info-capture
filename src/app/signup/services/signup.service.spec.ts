import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SignupService } from './signup.service';
import { environment } from 'src/environments/environment';

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call sendUserInfo to trigger http post method', () => {
    environment.apiUrl = 'https://mockurl.com/'
    const mockUserInfo = {firstName: 'test', lastName: 'test', email: 'test@gmail.com'};
    service.sendUserInfo(mockUserInfo).subscribe();
    const req = httpMock.expectOne({method: "POST"});
    req.flush(mockUserInfo);
    expect(req.request.url).toBe(environment.apiUrl+'user');
    expect(req.request.body).toEqual(mockUserInfo);
  });
  
});
