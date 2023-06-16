import { Component , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})

export class SectionComponent {
  @Output() search = new EventEmitter<string>(); // Emitting a string value
  @Output() showCourseInfo =  new EventEmitter<boolean>();

  handleSearch(value: string):void {
    this.search.emit(value); // Emit the search text value
  }

  addCourse() {
    this.showCourseInfo.emit(true);
  }
}
