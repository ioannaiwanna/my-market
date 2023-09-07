import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-msg',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="notification">
    <div class="message">{{ message }}</div>
    <button class="close-button" (click)="closeNotification()">Close</button>
  </div>`,
})
export class NotificationMsgComponent {
  @Input() message: string = ' ';
  @Output() close = new EventEmitter<void>();

  closeNotification() {
    this.close.emit();
  }
}
