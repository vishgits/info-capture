import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image and heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('img')?.src).toContain('assets/logo.png');
    expect(compiled.querySelector('h4')?.textContent).toContain('Info Capture App');
  });
});
