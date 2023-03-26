import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {}
  loginUser(): void {
    localStorage.clear();
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        this.dialogRef.close();
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.snackBar.open('Logged in', 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(result, 'OK', { duration: 2000 });
      }
    );
  }
}