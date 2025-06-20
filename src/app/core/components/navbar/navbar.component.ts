import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../features/auth/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user?: User;

  constructor(private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response)=>{
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
