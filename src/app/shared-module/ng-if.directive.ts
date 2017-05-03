import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[hbNgIf]'
})
export class NgIfDirective {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set hbNgIf(condition: boolean) {
    if (!condition) {
      this.viewContainer.clear();
      return;
    }

    this.viewContainer.createEmbeddedView(this.templateRef);
  }

}
