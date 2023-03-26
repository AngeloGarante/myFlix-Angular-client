import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  @Input() name: string = '';
  username = localStorage.getItem('user');
  constructor(
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}
  deleteUser(): any {
    if (this.username == this.name) {
      this.router.navigate(['welcome']);

      this.fetchApiData.deleteAccount().subscribe((resp) => {});
      localStorage.clear();
      this.snackBar.open(`${this.username} account has been deleted`);
    } else {
      alert('Username is incorrect');
    }
  }
}
