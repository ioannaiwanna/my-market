import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-msg',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="notification">
    <div class="message">{{ message }}</div>
    <button
      class=" px-4 py-1 border rounded-full border-green-600 text-sm text-green-600  hover:text-white hover:bg-green-600 hover:border-transparent"
    >
      Close
    </button>
  </div>`,
})
export class NotificationMsgComponent implements OnInit {
  message: string = '';
  constructor(private route: ActivatedRoute, private location: Location) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['message'];
    });
  }
}
