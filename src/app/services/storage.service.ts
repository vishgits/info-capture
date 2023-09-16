import { Injectable } from '@angular/core';
import { Response } from '../interface/api-response';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  setDataToSession(res: Response): void {
    sessionStorage.setItem('userId', res.userId);
  }
  getDataFromSession(): string | null {
    return sessionStorage.getItem('userId');
  }
}