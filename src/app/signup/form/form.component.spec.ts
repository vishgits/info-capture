import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [FormsModule,
        ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call onSubmit if button is clicked and if form is invalid show error message', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.error-message')[0]?.textContent).toContain('Enter a valid first name.')
    expect(fixture.debugElement.nativeElement.querySelectorAll('.error-message')[1]?.textContent).toContain('Enter a valid last name.')
    expect(fixture.debugElement.nativeElement.querySelectorAll('.error-message')[2]?.textContent).toContain('Enter a valid email address.')
  });

  it('should validate emailaddress, first name and last name and if invalid show error message', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs.forEach((input)=> {
      const el = input.nativeElement;
      el.value = 'test123';
      el.dispatchEvent(new Event('input'));
    });
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.error-message')[0]?.textContent).toContain('Enter a valid first name.')
    expect(fixture.debugElement.nativeElement.querySelectorAll('.error-message')[1]?.textContent).toContain('Enter a valid last name.')
    expect(fixture.debugElement.nativeElement.querySelectorAll('.error-message')[2]?.textContent).toContain('Enter a valid email address.')
  });
  
  it('should call onSubmit if button is clicked and if the form is valid trigger saveForm to emit userInfo ', () => {
    spyOn(component.saveForm, 'emit');
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    inputs.forEach((input)=> {
      const el = input.nativeElement;
      el.value = el.id === 'email' ? 'test@gmail.com' : 'test';
      el.dispatchEvent(new Event('input'));
    });
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.error-message').length).toBe(0);
    expect(component.saveForm.emit).toHaveBeenCalledTimes(1);
  });
});
