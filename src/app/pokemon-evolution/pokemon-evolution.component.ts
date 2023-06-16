import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css']
})
export class PokemonEvolutionComponent {
  @Input() pokemon: any;
  @Input() pokemonNextInChain: any;
}
