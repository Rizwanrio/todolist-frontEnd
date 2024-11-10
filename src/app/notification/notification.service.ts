import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private eventSource: EventSource;

  constructor(private zone: NgZone) {
    this.eventSource = new EventSource(
      'http://localhost:8080/notifications/overdue-tasks'
    );
  }

  listenForOverdueTasks(): Observable<string> {
    return new Observable<string>((observer) => {
      this.eventSource = new EventSource(
        'http://localhost:8080/notifications/overdue-tasks',
        { withCredentials: true }
      );

      this.eventSource.addEventListener('overdueTaskNotification', (event) => {
        this.zone.run(() => observer.next((event as MessageEvent).data));
      });

      this.eventSource.onerror = () => this.eventSource.close(); // Close on error

      return () => this.eventSource.close();
    });
  }
}
