import { Component , Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})

export class SectionComponent {
  @Output() search = new EventEmitter<string>();

  searchInput: Subject<Event> = new Subject<Event>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.searchInput.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(e => {
      this.handleSearch(e);
    });
  }

  handleSearch(e: Event) {
    const value: string = (e.target as HTMLTextAreaElement).value;
    if(value.length >= 3 || value.length === 0) {
      this.search.emit(value);
    } else {
      return;
    }
  }

  addCourse() {
    this.router.navigate(['/courses/new']);
  }
}
