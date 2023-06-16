import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SearchService } from '../services/search.service';
import { Pokemon } from '../pokemon';
import { PokemonSpecies } from '../pokemon-species';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  Pokemons: Pokemon[] = [];
  filteredPokemons: any[] = [];
  pokemonName: string | null = null;
  pokemon: Pokemon =
    {
      abilities: [], base_experience: 0, forms: [], game_indices: [], height: 0,
      held_items: [], id: 0, moves: [], name: '', order: 0, past_types: [], species: [],
      sprites: [], stats: [], types: [], weight: 0
    };
  pokemonEvolution: any;
  pokemonSpecies: PokemonSpecies = {
    egg_groups: [],
    flavor_text_entries: [],
    evolution_chain: { url: "" },
    capture_rate: 0,
    genera: [],
    gender_rate: 0,
    hatch_counter: 0
  }
  pokemonEnglishShortDescription: any;
  pokemonEnglishLongDescription: any;

  efforts: any;
  genderRatio: string | null = null;
  typeDamages: any = [];
  pokemonNextInChain: any;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    public searchService: SearchService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.pokemonService.getPokemons()
      .subscribe((response: any) => {
        response.results.forEach((result: any) => {
          this.pokemonService.getPokemonData(result.name)
            .subscribe((uniqResponse: any) => {
              const pokemon = new Pokemon(uniqResponse)
              this.Pokemons.push(pokemon);
            });
        });
      });

    this.searchService.searchTerm$.subscribe((searchTerm: string) => {
      if (searchTerm && searchTerm.length >= 3) {
        const exactMatch = this.Pokemons.find(pokemon =>
          pokemon.name.toLowerCase() === searchTerm.toLowerCase()
        );

        if (exactMatch) {
          this.router.navigateByUrl(`/pokemons/${exactMatch.name}`);
        }
      }
    });

    this.route.paramMap.subscribe(params => {
      this.pokemonName = params.get('name');
      this.getPokemonSpecies();
    });
  }

  getPokemonDetails(): void {
    this.pokemonService.getPokemonData(this.pokemonName!)
      .subscribe((response: any) => {
        this.pokemon = new Pokemon(response);
        this.getGenderRatio();
        this.getTypeDamages();
        this.getEvolutionChain();
        this.getPokemonEfforts();
      });
  }

  getPokemonSpecies(): void {
    this.pokemonService.getPokemonSpecies(this.pokemonName!).subscribe((response: any) => {
      this.pokemonSpecies = new PokemonSpecies(response);
      this.getPokemonDescriptions();
      this.getPokemonDetails();
    });
  }

  getPokemonDescriptions(): void {
    if (this.pokemonSpecies) {
      const englishShortDescription = this.pokemonSpecies.genera.find(
        (entry: any) => entry.language.name === 'en'
      );
      this.pokemonEnglishShortDescription = englishShortDescription;

      const englishLongDescription = this.pokemonSpecies.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en');
      this.pokemonEnglishLongDescription = englishLongDescription;
    }
  }

  getGenderRatio(): void {
    if (this.pokemon && this.pokemonSpecies) {
      if (this.pokemonSpecies.gender_rate === -1) {
        this.genderRatio = 'Genderless';
      } else if (this.pokemonSpecies.gender_rate === 0) {
        this.genderRatio = 'Male Only';
      } else if (this.pokemonSpecies.gender_rate === 8) {
        this.genderRatio = 'Male:Female 7:1';
      } else if (this.pokemonSpecies.gender_rate === 4) {
        this.genderRatio = 'Female:Male 3:1'
      }
      else {
        const femaleRatio = 12.5 * this.pokemonSpecies.gender_rate;
        const maleRatio = 100 - femaleRatio;
        this.genderRatio = `Male:${maleRatio}% Female:${femaleRatio}%`;
      }
    }
  }

  getTypeDamages() {
    const damageObservables = [];

    for (const type of this.pokemon!.types) {
      damageObservables.push(this.pokemonService.getDamages(type.type.name));
    }
   
    forkJoin(damageObservables).subscribe((responses: any[]) => {
      const typeDamagesSet = new Set<string>();
      for (const response of responses) {
        for (const type of response.damage_relations.double_damage_from) {
          typeDamagesSet.add(type.name);
        }
        for (const type of response.damage_relations.half_damage_from) {
          typeDamagesSet.add(type.name);
        }
      }

      this.typeDamages = typeDamagesSet;
    });
  }

  getEvolutionChain() {
    this.pokemonService.getEvolutionChain(this.pokemonSpecies.evolution_chain.url)
      .subscribe((response: any) => {
        this.pokemonEvolution = response;
        this.getNextInChainPokemon()
      })
  }

  getNextInChainPokemon() {
    let firstPokemonInChain: string = this.pokemonEvolution.chain.species.name;
    let secondPokemonInChain: string = this.pokemonEvolution.chain.evolves_to[0].species.name;

    let nextPokemon: string;
    if (firstPokemonInChain === this.pokemon!.name) {
      nextPokemon = secondPokemonInChain;
    }
    else if (secondPokemonInChain === this.pokemon!.name) {
      let thirdPokemonInChain: string | undefined = this.pokemonEvolution?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species.name ?? undefined;
      if (thirdPokemonInChain === undefined) {
        nextPokemon = secondPokemonInChain
      } else {
        nextPokemon = thirdPokemonInChain;
      }
    }
    else {
      nextPokemon = this.pokemon!.name
    }
    this.pokemonService.getPokemonData(nextPokemon)
      .subscribe((response: any) => {
        this.pokemonNextInChain = response;
      }
    )
  }

  getPokemonEfforts(){
    this.pokemonService.getEffortValues(this.pokemonName!)
      .subscribe((efforts: any[])=>{
        this.efforts = efforts;
      }
    )
  }
}
