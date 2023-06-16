import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-product-list',
  templateUrl: './pokemon-product-list.component.html',
  styleUrls: ['./pokemon-product-list.component.css']
})
export class PokemonProductListComponent implements OnInit{
  products: any[] = [];

  constructor(){
  }

  ngOnInit(): void {
    const storedProducts = localStorage.getItem('pokemonProduct');
    if(storedProducts) {
      this.products = JSON.parse(storedProducts)
    }
  }
}
