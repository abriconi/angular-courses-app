import { Component, Input } from '@angular/core'
import { type Course } from 'src/app/utilus/global.moduls'

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss']
})
export class CoursesItemComponent {
  @Input() courseData?: Course

  log() {
    console.log(this.courseData);

  }
}
