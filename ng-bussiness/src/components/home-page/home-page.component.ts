import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
    constructor() {
    console.log("home page ");
  }
}
