import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dateFormat]'
})
export class DateformatDirective {

  @Input()
  dateFormat: string;

  constructor(private el: ElementRef) { }

  @HostListener('keyup') onKeyUp() {
    // var numChars = $scope.date.length;
		// 		if(numChars === 2 || numChars === 5){
		// 			var thisVal = $scope.date;
		// 			thisVal += '/';
		// 			$scope.date = thisVal;
		// 		}
    var numChars = this.el.nativeElement.value.length;
    	if(numChars === 4 || numChars === 7){
				var thisVal = this.el.nativeElement.value;
					thisVal += '-';
					this.el.nativeElement.value = thisVal;
				}
  }

}
