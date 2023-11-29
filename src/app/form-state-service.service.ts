import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStateServiceService {
  private formValidSource = new BehaviorSubject<boolean>(false);
  formValid$ = this.formValidSource.asObservable();

  setFromValidity(isValid: boolean) {
    this.formValidSource.next(isValid);
  }
}
