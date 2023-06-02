import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  searchQuery: string = '';
  showSearchInput: boolean = false;
  showSearchInputAnimation: boolean = false;

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }

  toggleSearchInput(): void {
    this.showSearchInput = !this.showSearchInput;
    if (this.showSearchInput) {
      setTimeout(() => {
        this.showSearchInputAnimation = true;
      }, 0);
    } else {
      this.showSearchInputAnimation = false;
    }
  }
}
