import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, keyframes } from "@angular/animations"
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatToolbarModule, MatCardModule, MatIconModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  animations: [
    trigger("fadeInUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("slideInLeft", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-50px)" }),
        animate("800ms ease-out", style({ opacity: 1, transform: "translateX(0)" })),
      ]),
    ]),
    trigger("pulse", [
      transition(":enter", [
        animate("2s ease-in-out", keyframes([
          style({ transform: "scale(1)", offset: 0 }),
          style({ transform: "scale(1.05)", offset: 0.5 }),
          style({ transform: "scale(1)", offset: 1 }),
        ])),
      ]),
    ]),
    
    trigger("float", [
      transition(":enter", [
        animate("3s ease-in-out", keyframes([
          style({ transform: "translateY(0px)", offset: 0 }),
          style({ transform: "translateY(-10px)", offset: 0.5 }),
          style({ transform: "translateY(0px)", offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class LoginPageComponent {
  dialog = inject(MatDialog);
  constructor(private router: Router) { }
  SignIn() {
    this.dialog.open(SignInComponent);
  }
}