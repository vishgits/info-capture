import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private storageService: StorageService, private router: Router) {}
  canActivate() {
   if(this.storageService.getDataFromSession()){
    return true
   }else {
    this.router.navigate(['/signup']);
    return false;
   }
  }
}
