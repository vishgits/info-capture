import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SignupComponent } from './signup.component';
import {FormComponent} from './form/form.component'

import { SignupService } from './services/signup.service';


@NgModule({
  declarations: [
    SignupComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    SignupService
  ]
})
export class SignupModule { }
