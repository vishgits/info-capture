import { Component } from '@angular/core';
import { SignupService } from './services/signup.service';
import { UserInfo } from '../interface/user-info';
import { Response } from '../interface/api-response';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {
  constructor(private signUpService: SignupService , private router: Router, private storageService : StorageService){

  }
  public isError : boolean = false;
  saveUserInfo(userInfo: UserInfo): void {
    this.signUpService.sendUserInfo(userInfo).subscribe(this.saveObserver)
  }

  saveObserver = {
    next:(result: Response) =>{
      console.log('unit test pending');
      this.storageService.setDataToSession(result)
      this.router.navigate(['/', 'user-profile']);
    },
    error: (error: Response) =>{
      this.isError = true;
    }
  }


}
