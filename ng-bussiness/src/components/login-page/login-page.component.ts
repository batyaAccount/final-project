import { Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-login-page',
  standalone:true,
  imports: [MatButtonModule,MatDialogModule,MatToolbarModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
 dialog = inject(MatDialog);
  SignUp(){
    this.dialog.open(SignUpComponent);
  }
  SignIn(){
    this.dialog.open(SignInComponent);
  }
}