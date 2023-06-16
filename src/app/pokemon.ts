export class Pokemon {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  moves: any[];
  name: string;
  order: number;
  past_types: any[];
  species: any;
  sprites: any;
  stats: any[];
  types: any[];
  weight: number;

  constructor(pokemonData: any){
    this.abilities = pokemonData.abilities || [];
    this.base_experience = pokemonData.base_experience || 0;
    this.forms = pokemonData.forms || [];
    this.game_indices = pokemonData.game_indices || [];
    this.height = pokemonData.height || 0;
    this.held_items = pokemonData.held_items || [];
    this.id = pokemonData.id || 0;
    this.moves = pokemonData.moves || [];
    this.name = pokemonData.name || '';
    this.order = pokemonData.order || 0;
    this.past_types = pokemonData.past_types || [];
    this.species = pokemonData.species || null;
    this.sprites = pokemonData.sprites || {};
    this.stats = pokemonData.stats || [];
    this.types = pokemonData.types || [];
    this.weight = pokemonData.weight || 0;
  }
}
