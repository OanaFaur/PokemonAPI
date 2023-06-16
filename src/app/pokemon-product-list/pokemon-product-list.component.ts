import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-product-list',
  templateUrl: './pokemon-product-list.component.html',
  styleUrls: ['./pokemon-product-list.component.css']
})
export class PokemonProductListComponent implements OnInit{
  products: any[] = [];

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    const storedProducts = localStorage.getItem('pokemonProduct');
    if(storedProducts) {
      this.products = JSON.parse(storedProducts)
    }

    console.log(this.products)
  }
}
