import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonProductComponent} from './pokemon-product/pokemon-product.component';
import {PokemonProductListComponent} from './pokemon-product-list/pokemon-product-list.component'

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemons/:name', component: PokemonDetailsComponent },
  { path: 'pokemons', component: PokemonDetailsComponent},
  { path: 'pokemon-product', component: PokemonProductComponent},
  { path: 'pokemon-product-list', component:PokemonProductListComponent}
  // Other routes...
];

@NgModule({
  declarations: [],
  imports: [
   
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
