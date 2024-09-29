import { Component, inject } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  mainService: MainService = inject(MainService);
  isDark: boolean = false;
  isDropdownOpen = false;
  user: Observable<User> = this.mainService.getUser();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.mainService.logout();
  }

  toggle(): void {
    this.isDark = !this.isDark;
    this.mainService.isDark.next(this.isDark);
    console.log(this.isDark)
  }
}
