import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError, from, map, of, switchMap, tap, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  private localStorageKey = 'pokemonKeyData';
  private localStoragePokeDataKey = 'pokemonDataKeyData';
  private localStoragePokeSpeciesKey="pokemonSpecies";

  pokemons:any[]=[]

  getPokemons() : Observable<any>{
    const parsedPokemons = this.getPokemonsLocalStorage();

    if (parsedPokemons) {
      console.log(parsedPokemons)
      return from(parsedPokemons);
    } else {
      return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=122').pipe(
        tap((response: any) => {
          this.savePokemonLocalStorage(response.results);
        })
      );
    }
  }

  getPokemonData(name: string):  Observable<any> {
    const localStorageData = this.getPokemonDataLocalStorage();
    
  if (localStorageData) {
    const pokemon = localStorageData.find(pokemon => pokemon.name === name);
    if (pokemon) {
      return of(pokemon);
    }
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return this.http.get(url).pipe(
    tap((response: any) => {
      this.savePokemonDataLocalStorage(response);
    })
  );
}

  getEffortValues(name: string):Observable<any[]>{
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return this.http.get(url).pipe(
     map((response: any) =>
      response.stats
        .filter((stat: any) => stat.effort > 0)
        .map((stat: any) => ({
          stat: stat.stat.name,
          value: stat.effort
        }))
    )
  );
}

  getEvolutionChain(chainurl: string){
    const url = chainurl;
    return this.http.get(url);
  }

  getPokemonSpecies(name: string):Observable<any> {
    const localStrageData = this.getPokemonSpeciesLocalStorage();

    if(localStrageData){
      const species = localStrageData.find((species:any) => species.name ===name);
      if(species){
        return of(species)
      }
    }
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    return this.http.get(url).pipe(
      tap((response:any)=>{
        this.savePokemonSpeciesLocalStorage(response)
      })
    );
  }

  getDamages(pokemonType: string){
    
    const url = `https://pokeapi.co/api/v2/type/${pokemonType}`;
    return this.http.get(url);
  }

  getPokemonsLocalStorage(): any[] {
    const allPokemons = localStorage.getItem(this.localStorageKey);
    const parsedPokemons = allPokemons ? JSON.parse(allPokemons) : null;

    return parsedPokemons;
  }

  getPokemonDataLocalStorage():any[]{
    const allPokemon = localStorage.getItem(this.localStoragePokeDataKey)
    const parsedPokemons = allPokemon ? JSON.parse(allPokemon) :null;
    return parsedPokemons;
  }

  getPokemonSpeciesLocalStorage(){
    const species = localStorage.getItem(this.localStoragePokeSpeciesKey);
    const parsedSpecies = species ? JSON.parse(species): null;
    return parsedSpecies;
  }

  savePokemonLocalStorage(response:any){
    
    let allPokemons: any[] = [] // Initialize as an empty array if no data exists

    allPokemons.push(response);
    localStorage.setItem(this.localStorageKey, JSON.stringify(allPokemons));

  }

  savePokemonDataLocalStorage(response:any){
    let allPokemon:any[]=[]

    allPokemon.push(response)
    localStorage.setItem(this.localStoragePokeDataKey, JSON.stringify(allPokemon))
  }

  savePokemonSpeciesLocalStorage(response:any){
    let allSpecies:any[]=[]

    allSpecies.push(response)
    localStorage.setItem(this.localStoragePokeSpeciesKey, JSON.stringify(allSpecies))
  }

}