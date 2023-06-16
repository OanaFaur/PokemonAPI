import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { PokemonService } from './services/pokemon.service'
import { SearchService} from './services/search.service'
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';
import { PokemonDamageComponent } from './pokemon-damage/pokemon-damage.component';
import { PokemonEvolutionComponent } from './pokemon-evolution/pokemon-evolution.component';
import { UserService } from './services/user.service';
import { PokemonProductComponent } from './pokemon-product/pokemon-product.component';
import { PokemonProductListComponent } from './pokemon-product-list/pokemon-product-list.component';
import { PokemonStatisticsComponent } from './pokemon-statistics/pokemon-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PokemonProfileComponent,
    PokemonDamageComponent,
    PokemonEvolutionComponent,
    PokemonProductComponent,
    PokemonProductListComponent,
    PokemonStatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: 
  [PokemonService, 
    SearchService, 
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    UserService
    

  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
