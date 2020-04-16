import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Movie} from '../movies';
import {MovieApiService} from '../movie-api.service';
@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<Movie[]>;
  movie=[]
  hero: string;
  private searchTerm = new Subject<string>();

  search(term: string): void {
    this.searchTerm.next(term);
  }
  constructor(private movieService:MovieApiService) { }

  ngOnInit(): void {
    this.movies$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.movieService.searchMovies(term)),
    );
  }

}
