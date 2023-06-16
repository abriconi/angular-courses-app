import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isError = false;

  constructor(private authService: AuthService) {}

  login(event: Event): void {
    event.preventDefault();

    const login = this.userForm.value.login;
    const password = this.userForm.value.password;
    this.isError = false;

    if (this.userForm.invalid) {
      this.isError = true;

      return;
    }

    if(login && password) {
      this.authService.login(login, password);
    }
  }

  forgotPassword(): void {
    console.log('Forgot password');
  }
}
