import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-damage',
  templateUrl: './pokemon-damage.component.html',
  styleUrls: ['./pokemon-damage.component.css']
})
export class PokemonDamageComponent {
  @Input() pokemonDamages: any;
  @Input() pokemon: any;
}
