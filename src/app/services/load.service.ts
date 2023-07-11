import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  loadSubject$ = new BehaviorSubject<boolean>(false);
  loader$ = this.loadSubject$.asObservable();

  showLoader() {
    this.loadSubject$.next(true);
  }

  hideLoader() {
    this.loadSubject$.next(false);
  }
}
