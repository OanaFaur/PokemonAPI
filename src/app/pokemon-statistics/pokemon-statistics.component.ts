import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-statistics',
  templateUrl: './pokemon-statistics.component.html',
  styleUrls: ['./pokemon-statistics.component.css']
})
export class PokemonStatisticsComponent {
  @Input() pokemon :any;
}
