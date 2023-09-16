import { Injectable } from '@angular/core';
import { Response } from '../interface/api-response';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setDataToSession(res: Response): void {
    sessionStorage.setItem('userId', JSON.stringify(res.userId));
  }
  getDataFromSession(): string | null {
    return sessionStorage.getItem('userId');
  }
}
