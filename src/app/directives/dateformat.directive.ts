import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dateFormat]'
})
export class DateformatDirective {

  @Input()
  dateFormat: string;

  constructor(private el: ElementRef) { }

  @HostListener('keyup') onKeyUp() {
    console.log("keyup hit");
  }

}
