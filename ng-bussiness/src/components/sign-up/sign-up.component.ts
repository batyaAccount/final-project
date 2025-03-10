import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { User } from '../../entities/User';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {


  constructor(private login: LoginService, private router: Router, private dialogRef: MatDialog) {

  }
  signUpForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('', [Validators.required]),
  });

  private closeDialogAndNavigate() {
    this.dialogRef.closeAll();
    setTimeout(() => this.router.navigate(['/home']), 100);
  }

  signUp() {
    if (this.signUpForm.valid) {
      const res = this.login.addUser(this.signUpForm.value as Partial<User>).subscribe({
        next: (response) => {
          console.log(response);
          this.user.setValue(response);
          console.log(this.user);
          this.closeDialogAndNavigate();
        }
        , error: (err) => {
          alert("can`t sign up");
        }
      });
    }

  }
}

