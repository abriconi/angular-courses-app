import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SectionComponent } from './section.component';
import { SharedModule } from '../../../shared/shared.module';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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

  it('should not emit the search value when handleSearch is called with an invalid value', () => {
    const searchValue = 'ex';
    const searchEmitterSpy = spyOn(component.search, 'emit');

    component.handleSearch({ target: { value: searchValue } } as unknown as Event);

    expect(searchEmitterSpy).not.toHaveBeenCalled();
  });

  it('should emit the search value after debounceTime and distinctUntilChanged', fakeAsync(() => {
    const searchValue = 'example search';
    const searchEmitterSpy = spyOn(component.search, 'emit');
    const subject = new Subject<Event>();

    subject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((e) => {
      component.handleSearch(e);
    });

    tick(300);

    subject.next({ target: { value: searchValue } } as unknown as Event);
    tick(300);
    expect(searchEmitterSpy).toHaveBeenCalledWith(searchValue);
  }));
});
