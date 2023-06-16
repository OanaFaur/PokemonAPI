import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent {
  @Input() pokemonProfile: any
  @Input() pokemonSpeciesProfile: any
  @Input() genderRatio: string | null = null;
  @Input() effortValues: any
  constructor(
    
  ) {
  }
}
