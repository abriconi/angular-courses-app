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

  handleSearch() {
    console.log(this.searchForm.value);

    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value);
    }
  }
}
