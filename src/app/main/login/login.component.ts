import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, switchMap, EMPTY, map, concatMap } from 'rxjs';
import { MainService } from '../main.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mainService: MainService = inject(MainService);
  router: Router = inject(Router);
  loginForm: FormGroup;

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;
      const userName = this.loginForm.value['username'];
      const password = this.loginForm.value['password'];
      this.mainService.login(userName, password).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/home']);
        },
        error: (error) => console.error(error)
      });
  }


  ngOnInit(): void {
    const token = this.mainService.getAccessToken();
    if(token) {
      this.router.navigate(['home']);
    }
  }

}

