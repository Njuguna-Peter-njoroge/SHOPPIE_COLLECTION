import { Component } from '@angular/core';
import {Navbar} from '../Component/navbar/navbar';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    Navbar
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage {

}
