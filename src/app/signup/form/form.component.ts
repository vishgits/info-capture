import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/interface/user-info';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  @Output() saveForm: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();
  signUpForm = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    lastName: new FormControl('',[Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  validateInput(field: string): boolean | undefined {
    return this.signUpForm.get(field)?.invalid && this.signUpForm.get(field)?.touched;
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const payload = <UserInfo> this.signUpForm.value;
      this.saveForm.emit(payload);
    } else {
      Object.keys(this.signUpForm.controls).forEach(field => {
        const control = this.signUpForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
