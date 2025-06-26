import { Component } from '@angular/core';
import {Navbar} from '../Component/navbar/navbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    Navbar,
    RouterLink
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {

}
