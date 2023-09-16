import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SignupService } from './services/signup.service';
import { StorageService } from '../services/storage.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  template: '<form></form>'
})
class MockFormComponent {}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const signUpServiceSpy = jasmine.createSpyObj('SignupService', ['sendUserInfo']);
  const storageServiceSpy = jasmine.createSpyObj('StorageService', ['setDataToSession']);
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  const mockUserInfo = {firstName: 'test', lastName: 'test', email: 'test@gmail.com'};
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent, MockFormComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [{provide: SignupService, useValue: signUpServiceSpy},{provide: StorageService, useValue: storageServiceSpy}
        ,{provide: Router, useValue: router}]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading as Create Your Account', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title h3')?.textContent).toContain('Create Your Account');
  });
  it('should render app-form component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-form')).toBeTruthy();
  });
  it('saveUserInfo method should call sendUserInfo and return successfull response ', () => {
    signUpServiceSpy.sendUserInfo.and.returnValue(of({userId: 'test', message: 'Successfully created the account'}))
    component.saveUserInfo(mockUserInfo);
    expect(storageServiceSpy.setDataToSession).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/user-profile']);
  });

  it('should call saveUserInfo to send userinfo to backend api', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const err = new Error();
    signUpServiceSpy.sendUserInfo.and.returnValue(throwError(() => err));
    component.saveUserInfo(mockUserInfo);
    fixture.detectChanges();
    expect(compiled.querySelector('.error-banner')?.textContent).toContain('Something went wrong! Please try again later');
  });
});
