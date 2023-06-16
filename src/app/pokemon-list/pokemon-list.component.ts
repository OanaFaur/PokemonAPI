import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  itemsPerPage: number = 30;
  totalPages: number = 0;
  currentPage: number = 1;
  filteredPokemons: any[] = [];

  constructor(
    private pokemonService: PokemonService,
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons()
      .subscribe((response: any) => {

        const pokemonCount = response.results.length
        console.log(pokemonCount)
        this.totalPages = Math.ceil(pokemonCount / this.itemsPerPage)

        response.results.forEach((result: any) => {
          this.pokemonService.getPokemonData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
            });
        });
      });

    this.searchService.searchTerm$.subscribe((searchTerm: string) => {
      if (searchTerm && searchTerm.length >= 3) {
        const exactMatch = this.pokemons.find(pokemon =>
          pokemon.name.toLowerCase() === searchTerm.toLowerCase()
        );

        if (exactMatch) {
          this.router.navigateByUrl(`/pokemons/${exactMatch.name}`);
          this.filteredPokemons = this.pokemons;
        }
        else {
          this.filteredPokemons = this.pokemons;
        }
      }
    });

    this.filteredPokemons = this.pokemons;
  }

  getCurrentPagePokemons(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredPokemons.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getFallbackImage(event: any) {
    event.target.src = '../assets/pikachu_crying.jpg';
  }
}
