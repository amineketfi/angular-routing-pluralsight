import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd,
        NavigationCancel, NavigationError, RouterEvent } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed() {
    return this.messageService.isDisplayed;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
    ) {
        router.events.subscribe((RouterEvent: Event) => {
          this.checkRouterEvent(RouterEvent);
        });
      }

  checkRouterEvent(routerEvent: Event): void {
    if(routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
          this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

  displayMessages() {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

}
