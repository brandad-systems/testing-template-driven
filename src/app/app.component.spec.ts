import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormProviderDirective} from "./form-provider.directive";

describe('FormProvider AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent, FormProviderDirective]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('injected directive ohne async', () => {
    expect(component).toBeTruthy()
    expect(FormProviderDirective.form.value).toEqual({test: '123'})
    expect(FormProviderDirective.form.valid).toBeTruthy()
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'Red';
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges();
    expect(FormProviderDirective.form.value).toEqual({test: 'Red'})
    expect(FormProviderDirective.form.valid).toBeTruthy()
    input.value = '';
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges();
    expect(FormProviderDirective.form.value).toEqual({test: ''})
    expect(FormProviderDirective.form.valid).toBeFalse()
  })

  it('injection directive waitForAsync', waitForAsync(() => {
    fixture.whenStable().then(() => {
      expect(FormProviderDirective.form.value).toEqual({test: ''})
      expect(FormProviderDirective.form.valid).toBeFalse()
      const input = fixture.debugElement.query(By.css("input"));
      input.nativeElement.value = 'Red';
      input.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();
      expect(FormProviderDirective.form.value).toEqual({test: 'Red'})
      expect(FormProviderDirective.form.valid).toBeTruthy()
      input.nativeElement.value = '';
      input.nativeElement.dispatchEvent(new Event('input'))
      fixture.detectChanges();
      expect(FormProviderDirective.form.value).toEqual({test: ''})
      expect(FormProviderDirective.form.valid).toBeFalse()
    })
  }))
});
