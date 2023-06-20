import { Component , Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})

export class SectionComponent {
  @Output() search = new EventEmitter<string>(); // Emitting a string value
  @Output() showCourseInfo =  new EventEmitter<boolean>();

  constructor(private router: Router) { }

  handleSearch(value: string):void {
    this.search.emit(value); // Emit the search text value
  }

  addCourse(value: boolean) {
    this.router.navigate(['/courses/new']);
  }
}
