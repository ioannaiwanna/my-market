import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-msg',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="notification">
    <div class="message">{{ message }}</div>
    <button
      class=" px-4 py-1 border rounded-full border-green-600 text-sm text-green-600  hover:text-white hover:bg-green-600 hover:border-transparent"
      (click)="closeNotification()"
    >
      Close
    </button>
  </div>`,
})
export class NotificationMsgComponent implements OnInit {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {}

  closeNotification() {
    this.close.emit();
  }
}
