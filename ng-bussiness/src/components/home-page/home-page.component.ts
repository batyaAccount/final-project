import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { log } from 'console';
import { UserManagementComponent } from "../user-management/user-management.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
    constructor() {

  }
}
