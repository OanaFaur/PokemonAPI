import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any> {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=122';
    
    return this.http.get(url);
  }

  getPokemonData(name: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get(url);
  }

  getEffortValues(name: string): Observable<any[]> {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get(url).pipe(
      map((response: any) =>
        response.stats
          .filter((stat: any) => stat.effort > 0)
          .map((stat: any) => ({
            stat: stat.stat.name,
            value: stat.effort,
          }))
      )
    );
  }

  getEvolutionChain(chainurl: string) {
    const url = chainurl;
    return this.http.get(url);
  }

  getPokemonSpecies(name: string): Observable<any> {
    
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    return this.http.get(url)
  }

  getDamages(pokemonType: string) {
    const url = `https://pokeapi.co/api/v2/type/${pokemonType}`;
    return this.http.get(url);
  }
}
