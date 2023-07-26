import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/pokemons';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  searchPokemons(searchTerm: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}?name=${searchTerm}`)
      .pipe(
        map((pokemons: Pokemon[]) =>
          pokemons.filter(pokemon =>
            pokemon.id.toString().includes(searchTerm) ||
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
  }


  createPokemon(newPokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.apiUrl, newPokemon).pipe(
      catchError(this.handleError<Pokemon>('createPokemon'))
    );
  }

  editPokemon(updatedPokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.apiUrl}/${updatedPokemon.id}`;
    return this.http.put<Pokemon>(url, updatedPokemon).pipe(
      catchError(this.handleError<Pokemon>('editPokemon'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return throwError('Algo salió mal; por favor, inténtalo de nuevo más tarde.');
    };
  }
}
