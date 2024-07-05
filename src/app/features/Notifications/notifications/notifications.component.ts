import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  public notifications: Notification[] = [];
  public unreadCount: number = 0;
  public hasUnreadNotifications: boolean = false;
  userId: string = JSON.parse(localStorage.getItem('userData') || "{}").id ;


  constructor(private notificationsService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
    this.loadUnreadCount();
    this.checkHasUnreadNotifications();
  }

  loadNotifications(): void {
    this.notificationsService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  loadUnreadCount(): void {
    this.notificationsService.getNumberOfUnreadNotifications(this.userId).subscribe(
      (count) => {
        this.unreadCount = count;
      },
      (error) => {
        console.error('Error fetching unread count:', error);
      }
    );
  }

  checkHasUnreadNotifications(): void {
    this.notificationsService.getHasUnreadNotifications(this.userId).subscribe(
      (hasUnread) => {
        this.hasUnreadNotifications = hasUnread;
      },
      (error) => {
        console.error('Error checking unread notifications:', error);
      }
    );
  }

  markAllAsRead(): void {
    this.notificationsService.markAllAsRead(this.userId).subscribe(
      () => {
        // Refresh notifications and unread count after marking as read
        this.loadNotifications();
        this.loadUnreadCount();
      },
      (error) => {
        console.error('Error marking notifications as read:', error);
      }
    );
  }
}
