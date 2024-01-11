import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private hasAllergiesSubject = new BehaviorSubject<boolean>(false);
  hasAllergies$ = this.hasAllergiesSubject.asObservable();

  setHasAllergies(value: boolean) {
    this.hasAllergiesSubject.next(value);
  }
}
