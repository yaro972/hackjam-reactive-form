import {Directive, ElementRef, forwardRef, HostListener, Renderer} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


export const CHECKBOX_WITH_VALUE_BINDED_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxWithValueBindedControlValueAccessorDirective),
  multi: true,
};

/**
 * The accessor for writing a value and listening to changes on a checkbox input element.
 *
 *
 *  ### Example
 *  ```
 *  <input type="checkbox" name="rememberLogin" [value]="2">
 *  ```
 *  you will get 2 when the checkbox will be checked and not true/false

 */
@Directive({
  selector: '[hvaCheckboxWithValueBinded]',
  providers: [CHECKBOX_WITH_VALUE_BINDED_VALUE_ACCESSOR]
})
export class CheckboxWithValueBindedControlValueAccessorDirective implements ControlValueAccessor {
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {
  }

  @HostListener('change', ['$event']) change(event) {
    if (event.target.checked) {
      return this.onChange(event.target.value);
    }
    return this.onChange('');
  }

  @HostListener('blur', ['$event']) touched(event) {

    return this.onTouched();
  }

  writeValue(value: any): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'checked', value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
