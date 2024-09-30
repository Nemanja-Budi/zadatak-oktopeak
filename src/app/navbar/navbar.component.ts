import { Component, inject } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AccountService } from '../main/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  mainService: MainService = inject(MainService);
  accountService: AccountService = inject(AccountService);
  router: Router = inject(Router);
  
  isDark: boolean = false;
  isDropdownOpen = false;
  user: Observable<User> = this.accountService.getUser();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

  toggle(): void {
    this.isDark = !this.isDark;
    this.mainService.isDark.next(this.isDark);
  }
}
