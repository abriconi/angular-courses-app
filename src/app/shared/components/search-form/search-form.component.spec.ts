import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchFormComponent } from './search-form.component';
import { ButtonComponent } from '../button/button.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFormComponent, ButtonComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event with searchForm value when form is valid', () => {
    spyOn(component.search, 'emit');
    const searchValue = 'example';
    const inputElement = fixture.nativeElement.querySelector('.searchInput');
    const buttonElement = fixture.nativeElement.querySelector('.searchBtn').querySelector('button');

    inputElement.value = searchValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    buttonElement.click();
    expect(component.search.emit).toHaveBeenCalledWith(searchValue);
  });
});
