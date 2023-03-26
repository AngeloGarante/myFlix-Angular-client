import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  @Input() updateData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };
  favoritelist: any[] = [];
  constructor(
    public fecthApiData: FetchApiDataService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getFavoriteList();
  }
  getUser(): void {
    this.fecthApiData.getUser().subscribe((result) => {
      this.user = result;
      return this.user;
    });
  }
  getFavoriteList(): any {
    this.fecthApiData.getAllMovies().subscribe((resp) => {
      console.log();
      this.user.FavoriteMovies.forEach((i: any) => {
        resp.filter((movie: any) => {
          if (movie._id === i) {
            this.favoritelist.push(movie);
          } else {
            return;
          }
        });
      });
    });
  }
  editUser(): void {
    this.fecthApiData.updateUser(this.updateData).subscribe((result) => {
      this.snackbar.open('User Updated', 'OK', { duration: 200 });
      () => {
        this.snackbar.open('could not update Profile', 'OK', {
          duration: 2000,
        });
      };
    });
  }
  deleteUser(): void {
    this.dialog.open(DeleteUserComponent, { width: '280px' });
  }
}
