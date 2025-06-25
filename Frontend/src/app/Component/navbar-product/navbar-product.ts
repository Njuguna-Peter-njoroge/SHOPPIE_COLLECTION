import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService} from '../../Services/auth-service';

@Component({
  selector: 'navbar-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-product.html',
  styleUrl: './navbar-product.css'
})
export class Navbar {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
