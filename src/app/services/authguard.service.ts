import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private storageService: StorageService) {}
  canActivate() {
   return this.storageService.getDataFromSession();
  }
}
