import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favoritelist: any[] = [];
  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteList();
  }
  openSynopsis(
    title: string,
    description: string,
    genre: string,
    director: string
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
        Genre: genre,
        Director: director,
      },
    }),
      {
        widht: '280px',
      };
  }
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  getFavoriteList(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoritelist = resp.FavoriteMovies;
      return this.favoritelist;
    });
  }

  openDirector(name: string, bio: string, birth: string, status: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Status: status,
      },
    }),
      {
        widht: '280px',
      };
  }
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
    }),
      {
        widht: '280px',
      };
  }
  toggleFavorite(id: string): void {
    console.log(this.favoritelist);
    if (!this.favoritelist.includes(id)) {
      this.fetchApiData.addFavorite(id).subscribe(
        (resp: any) => {
          this.favoritelist = resp.FavoriteMovies;
          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 4000,
          });
        },
        (resp) => {
          this.snackBar.open(resp.message, 'OK', { duration: 3000 });
        }
      );
    } else {
      this.fetchApiData.removeFavorite(id).subscribe(
        (resp: any) => {
          this.favoritelist = resp.FavoriteMovies;
          this.snackBar.open('Movie removed from favorites', 'OK', {
            duration: 4000,
          });
        },
        (resp) => {
          this.snackBar.open(resp.message, 'OK', { duration: 3000 });
        }
      );
    }
  }
}
