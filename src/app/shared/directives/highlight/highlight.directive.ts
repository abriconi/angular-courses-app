import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight?: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.appHighlight) {
      return;
    }

    const currentDate = new Date();
    const [day, month, year] = this.appHighlight.split('/');
    const formattedDateString = `${day}/${month}/${year}`;
    const creationDate = new Date(formattedDateString);

    const daysDifference = (currentDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysDifference <= 14 && 0 < daysDifference) {
      this.elementRef.nativeElement.style.borderColor = 'green';
    } else if (daysDifference < 0) {
      this.elementRef.nativeElement.style.borderColor = 'blue';
    }
  }
}
