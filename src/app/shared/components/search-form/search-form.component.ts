import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  @Output() search = new EventEmitter();

  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  handleSearch(event: Event) {
    event.preventDefault();

    if (this.searchForm.valid) {
      const searchText = this.searchForm.value.searchText;
      this.search.emit(searchText);
    }
  }
}
