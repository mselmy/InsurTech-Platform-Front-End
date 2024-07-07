import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  imports:[CommonModule],
  standalone:true,
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public notifications: Notification[] = [];
  public unreadCount: number = 0;
  public hasUnreadNotifications: boolean = false;
  userId: string = JSON.parse(localStorage.getItem('userData') || "{}").id;
  showNotifications:any=false;
  private notificationSubscription: Subscription | null = null;

  

  constructor(private notificationsService: NotificationService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadNotifications();
    

    this.notificationSubscription = this.notificationsService.notificationObservable.subscribe(message => {
      if (message) {
        this.loadNotifications(); // Reload notifications when a new message is received
        this.loadUnreadCount();
    this.checkHasUnreadNotifications();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  loadNotifications(): void {
    this.notificationsService.getNotificationsByUserId(this.userId).subscribe(
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
        console.log(count);
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
        if (this.showNotifications) {
          this.hasUnreadNotifications = false; 
        }
       
      },
      (error) => {
        console.error('Error marking notifications as read:', error);
      }
    );
  }

  toggleNotifications(): void {
    // Toggle visibility of notifications or any other action on bell click
    console.log('Notification bell clicked.');
    this.showNotifications = !this.showNotifications;
  
    // Set a timeout to mark all notifications as read after 5 seconds
    setTimeout(() => {
      this.markAllAsRead();
    }, 3000);
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }
}
