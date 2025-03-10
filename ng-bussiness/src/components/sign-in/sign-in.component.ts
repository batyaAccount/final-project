import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../services/login.service';
import { Person } from '../../../Person';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private login: LoginService, private user: UserService, private router: Router, private dialogRef: MatDialog) {

  }
  signInForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  private closeDialogAndNavigate() {
    this.dialogRef.closeAll();
    setTimeout(() => this.router.navigate(['/home']), 100);
  }

  signIn() {
    if (this.signInForm.valid) {
      const res = this.login.loginUser(this.signInForm.value as Partial<Person>).subscribe({
        next: (response) => {
          console.log(response);
          this.user.setValue(response);
          console.log(this.user);
          this.closeDialogAndNavigate();
        }
        , error: (err) => {
          alert("can`t sign in");
        }

      });
    }

  }
}



