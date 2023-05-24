import { Component } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  handleSearch(value: string):void {
    console.log(value);
  }

}
