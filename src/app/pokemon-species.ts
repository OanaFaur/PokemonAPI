export class PokemonSpecies {
    egg_groups:any [];
    evolution_chain: {
        url: string;
      };
    flavor_text_entries: any[];
    capture_rate: number;
    genera:any[];
    gender_rate:number;
    hatch_counter:number;
    
    constructor(pokemonSpecies: any){
        this.egg_groups = pokemonSpecies.egg_groups;
        this.evolution_chain = pokemonSpecies.evolution_chain;
        this.flavor_text_entries = pokemonSpecies.flavor_text_entries;
        this.capture_rate = pokemonSpecies.capture_rate
        this.genera = pokemonSpecies.genera
        this.gender_rate = pokemonSpecies.gender_rate
        this.hatch_counter = pokemonSpecies.hatch_counter
    }
}
