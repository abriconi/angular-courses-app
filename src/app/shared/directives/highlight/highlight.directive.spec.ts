import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let elementRefMock: ElementRef;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: document.createElement('div')
    };
    directive = new HighlightDirective(elementRefMock);
  });

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2023-05-17'));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should apply green border color if creation date is within 14 days', () => {
    const currentDate = new Date('05/17/2023');
    spyOn(Date, 'now').and.returnValue(currentDate.getTime());
    directive.appHighlight = '05/15/2023';
    directive.ngOnInit();
    expect(elementRefMock.nativeElement.style.borderColor).toBe('green');
  });

  it('should apply blue border color if creation date > current date, display upcomming course', () => {
    const currentDate = new Date('05/17/2023');
    spyOn(Date, 'now').and.returnValue(currentDate.getTime());
    directive.appHighlight = '05/18/2023';
    directive.ngOnInit();
    expect(elementRefMock.nativeElement.style.borderColor).toBe('blue');
  });

  it('should not apply border color if creation date is more than 14 days before current date', () => {
    const currentDate = new Date('05/17/2023');
    spyOn(Date, 'now').and.returnValue(currentDate.getTime());
    directive.appHighlight = '04/18/2023';
    directive.ngOnInit();
    expect(elementRefMock.nativeElement.style.borderColor).toBe('');
  });
});
