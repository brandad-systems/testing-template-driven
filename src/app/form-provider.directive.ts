import { Directive } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive({
  selector: 'form',
})
export class FormProviderDirective {
  static form: ControlContainer;

  constructor(public controlContainer: ControlContainer) {
    FormProviderDirective.form = controlContainer;
  }
}
