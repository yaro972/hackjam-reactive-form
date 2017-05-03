import {EmailValidatorDirective} from './email-validator.directive';
import {FormControl} from '@angular/forms';

describe('EmailValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new EmailValidatorDirective();
    expect(directive).toBeTruthy();
  });

  const error = { 'invalidEmail': true };
  it('should not get an error when enters a valid email  ', () => {
    const control = new FormControl('yolo@gmail.com');
    const validator = new EmailValidatorDirective();
    expect(validator.validate(control)).toBeNull();
  });
  it('should get an error when enters a invalid email: string', () => {
    const control = new FormControl('Hello');
    const validator = new EmailValidatorDirective();
    expect(validator.validate(control)).toEqual(error);
  });
  it('should get an error when enters a invalid email: number', () => {
    const control = new FormControl(123);
    const validator = new EmailValidatorDirective();
    expect(validator.validate(control)).toEqual(error);
  });
});
