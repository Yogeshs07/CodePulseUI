import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequest

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ){
    this.model = {
      email : '',
      password : ''
    }
  }

  onFormSubmit(): void{
    this.authService.login(this.model)
    .subscribe({
      next: (response)=>{
        //set auth cookie
        this.cookieService.set('Authorization',`Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');

        //set user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        })

        //redirect to home page
        this.router.navigateByUrl('/')
      }
    });
  }

}
