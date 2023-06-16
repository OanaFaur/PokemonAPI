import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { PokemonProductService } from '../services/pokemon-product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  searchTerm: string = '';
  isAdmin: boolean = false;
  pokemons: any[] = [];
  pokemonProducts: any[] = [];
  showProductList: boolean = false;

  constructor(
    private searchService: SearchService,
    private userService: UserService,
    private router: Router,
    private pokemonProductService: PokemonProductService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
    this.pokemonProductService.productAdded$.subscribe(()=>{
      this.loadProductsFromLocalStorage();
   })
   this.loadProductsFromLocalStorage()
  }

  loadProductsFromLocalStorage(): void {
    const storedProducts = localStorage.getItem('pokemonProduct');
    if (storedProducts) {
      this.pokemonProducts = JSON.parse(storedProducts);
    }
  }

  showPokemonList() {
    this.router.navigateByUrl('/pokemons');
  }

  filterPokemons(): void {
    this.searchService.setSearchTerm(this.searchTerm);
  }

  showProductForm() {
    this.router.navigateByUrl('/pokemon-product');
  }

  showPokemonProducts() {
    
    this.router.navigateByUrl('/pokemon-product-list')
  }
}
