import { Component, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../entities/User';
import { UsersService } from '../../service/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatOption } from '@angular/material/core';

//מחיקה ועדכון לא עובד!!!!!!!!!!!

@Component({
  selector: 'app-user-management',
  imports: [ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: User[] = [];

  userForm: FormGroup;
  editingUser: User | null = null;
  hidePassword: boolean = true;
  editingUserId: number | null = null;

  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

  add_user: boolean = false;
  constructor(private userService: UsersService, private fb: FormBuilder, private dialog: MatDialog) {


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      accountantId: [null],
      roleName: ['', Validators.required]

    });

  }
  ngOnInit(): void {
    this.loadUsers();
    console.log(this.users);

  }
  getUserInitials(user: User): string {
    return (user.name?.charAt(0) || '');
  }
  openAddUserDialog(): void {
    this.add_user = true;
    this.userForm.reset();
    this.openDialog();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
      }
    });
  }
  openDialog() {
    this.dialogRef = this.dialog.open(this.editDialog, {
      width: '500px',
      direction: 'rtl',
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.cancelEdit();
    });
  }
  startEdit(user: User) {
    debugger
    this.editingUserId = user.id;
    this.add_user = false;

    this.userForm.reset();
    this.userForm.patchValue({
      email: user.email,
      name: user.name,

    });
  }
  cancelEdit() {
    this.editingUserId = null;
    this.add_user = false;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  saveUser() {
    if (!this.editingUserId || this.userForm.invalid) return;

    const formValue = this.userForm.value;
    let updatedUser: User = {
      ...formValue,
      password: formValue.password || '',
    };

    if (formValue.password && formValue.password.trim() !== '') {
      updatedUser.password = formValue.password;
    }

    console.log("in saveUser before update");
    console.log(updatedUser);

    this.userService.updateUser({ ...updatedUser } as User).subscribe({
      next: () => {
        this.loadUsers();
        this.dialogRef.close();

        Swal.fire({
          title: 'הצלחה',
          text: 'המשתמש עודכן בהצלחה',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'שגיאה',
          text: 'אירעה שגיאה בעדכון המשתמש',
          icon: 'error',
          confirmButtonText: 'אישור',
          confirmButtonColor: '#5c6bc0'
        });
      }
    });
  }

  // addUser(): void {
  //   if (this.userForm.valid) {
  //     debugger
  //     this.userService.addUser(this.userForm.value).subscribe({
  //       next: () => {
  //         this.loadUsers();
  //         this.userForm.reset();
  //       },
  //       error: (err) => {
  //         console.error('Error adding user:', err);
  //       }
  //     });
  //   }
  // }
  addUser(): void {
    if (this.userForm.valid) {
      const userToAdd = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        roleName: this.userForm.value.roleName,
        accountantId:-1
      };

      this.userService.addUser(userToAdd as User).subscribe({
        next: () => {
          this.loadUsers();
          this.userForm.reset();
        },
        error: (error) => {
          console.error('Error adding user:', error.error.message || error.message);
        }

      });
    }
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.userForm.patchValue(user);
  }

  updateUser(): void {
    if (this.userForm.valid && this.editingUser) {
      this.userService.updateUser(this.userForm.value).subscribe({
        next: () => {
          this.loadUsers();
          this.userForm.reset();
          this.editingUser = null;
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.loadUsers(); // טען מחדש את המשתמשים
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }
}
