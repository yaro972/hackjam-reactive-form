import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[email][formControlName],[email][formControl],[email][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true}
  ]
})
export class EmailValidatorDirective implements Validator {

  constructor() {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const error = {'invalidEmail': true};
    if (!c.value) {
      return error;
    }
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c.value) ? null : error;

  }

}
