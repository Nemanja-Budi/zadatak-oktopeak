import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MainService } from '../../main.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  accountService: AccountService = inject(AccountService);
  user: Observable<User> = this.accountService.getUser();
}
