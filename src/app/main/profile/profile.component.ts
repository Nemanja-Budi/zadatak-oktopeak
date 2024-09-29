import { Component, inject } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  mainService: MainService = inject(MainService);
  user: Observable<User> = this.mainService.getUser();
}
