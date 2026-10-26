import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  email: string = '';

  password: string = '';

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    const token =
      localStorage.getItem(
        'access_token'
      );

    if (token) {

      this.router.navigate([
        '/products'
      ]);
    }
  }

  login(): void {

    this.errorMessage = '';

    this.authService.login({
      email: this.email,
      password: this.password
    })
    .subscribe({

      next: (response) => {

        console.log(
          'Login Success'
        );

        console.log(
          response
        );

        this.authService.saveToken(
          response.accessToken
        );

        this.authService.saveRefreshToken(
          response.refreshToken
        );

        this.router.navigate([
          '/products'
        ]);
      },

      error: (err) => {

        console.log(err);

        this.errorMessage =
          'Invalid username or password';
      }
    });
  }
}