import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SectionComponent } from './section.component';
import { SharedModule } from '../../../shared/shared.module';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionComponent ],
      imports: [ReactiveFormsModule, SharedModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should log the search value when handleSearch is called', () => {
    const consoleSpy = spyOn(console, 'log');
    const searchValue = 'example search';
    component.handleSearch(searchValue);
    expect(consoleSpy).toHaveBeenCalledWith(searchValue);
  });
});
