import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from 'src/app/interface/user-info';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Response } from '../../interface/api-response';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  sendUserInfo(userInfo: UserInfo): Observable<Response> {
    return this.http.post<Response>(environment.apiUrl+'user', userInfo);
  }
  
}
