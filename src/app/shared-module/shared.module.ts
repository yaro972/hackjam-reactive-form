import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CapitalizeFirstLetterPipe} from './pipes/capitalize-first-letter.pipe';
import {ReplaceAllUnderscoreBySpacePipe} from './pipes/replace-all-underscore-by-space.pipe';
import {AuthGuard} from './guards/auth.guard';
import {EmailValidatorDirective} from './validators/email-validator.directive';
import {CheckboxWithValueBindedControlValueAccessorDirective} from './checkbox-with-value-binded-control-value-accessor';
import { NgIfDirective } from './ng-if.directive';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    NavBarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeFirstLetterPipe,
    ReplaceAllUnderscoreBySpacePipe,
    CheckboxWithValueBindedControlValueAccessorDirective,
    NgIfDirective
  ],
  declarations: [
    NavBarComponent,
    CapitalizeFirstLetterPipe,
    ReplaceAllUnderscoreBySpacePipe,
    EmailValidatorDirective,
    CheckboxWithValueBindedControlValueAccessorDirective,
    NgIfDirective
  ],
  providers: [AuthGuard]
})
export class SharedModule {
}
