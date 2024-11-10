import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  template: `
    <div *ngFor="let notification of notifications">
      {{ notification }}
    </div>
  `,
})
export class NotificationsComponent implements OnInit {
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService
      .listenForOverdueTasks()
      .subscribe((message: string) => {
        this.notifications.push(message);
      });
  }
}
