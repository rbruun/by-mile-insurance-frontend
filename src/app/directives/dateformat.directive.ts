import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dateFormat]'
})
export class DateformatDirective {

  @Input()
  dateFormat: string;

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event']) onKeyUp(e: KeyboardEvent) {
    var numChars = this.el.nativeElement.value.length;
    	if(numChars === 4 || numChars === 7){
				var thisVal = this.el.nativeElement.value;
					thisVal += '-';
					this.el.nativeElement.value = thisVal;
				}
			if ((numChars == 5 || numChars == 8) && e.key == "Backspace") {
					this.el.nativeElement.value = this.el.nativeElement.value.slice(0,-1);
			}
	}

}
