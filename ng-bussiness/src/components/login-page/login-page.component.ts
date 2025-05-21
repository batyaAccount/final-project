import { Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone:true,
  imports: [MatButtonModule,MatDialogModule,MatToolbarModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
 dialog = inject(MatDialog);
constructor( private router: Router){}
  SignIn(){
    this.dialog.open(SignInComponent);
  }
}