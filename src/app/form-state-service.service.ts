import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormStateServiceService {
  private formValid = signal<boolean>(false);
  getFormValidity = () => this.formValid;
  setFromValidity = (isValid: boolean) => this.formValid.set(isValid);
}
