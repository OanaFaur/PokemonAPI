import { Component, OnInit  } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { PokemonProductService } from '../services/pokemon-product.service';

@Component({
  selector: 'app-pokemon-product',
  templateUrl: './pokemon-product.component.html',
  styleUrls: ['./pokemon-product.component.css']
})
export class PokemonProductComponent implements OnInit {
  temporaryPokemonProduct: any[] = [];
  pokemonProduct: any;
  categories: string[] = ['Electronics', 'Cloths', 'Blanket'];
  phoneTypes: string[] = ['Mobile', 'Landline'];

  
  constructor(private formBuilder: FormBuilder, private productService:PokemonProductService) { }
  ngOnInit(): void {
    this.pokemonProduct = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 -]+$')]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      category: ['', Validators.required],
      image: ['', [Validators.required, this.imageURLValidator()]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]{9,}$')]],
      phoneTypes: ['', Validators.required]
    })
  }

  imageURLValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const imageUrl = control.value;
      const validImageUrlPattern = /\.(jpeg|jpg|gif|png)$/i;

      if (!validImageUrlPattern.test(imageUrl)) {
        return { invalidImageUrl: true };
      }

      return null;
    };
  }

  addNewProduct(): void {
    if (this.pokemonProduct.valid) {
      this.temporaryPokemonProduct.push(this.pokemonProduct.value)
      this.pokemonProduct.reset();
    }
  }

  onSubmit(): void {

    const storedProducts = localStorage.getItem('pokemonProduct');
    let productsArray: any[] = storedProducts ? JSON.parse(storedProducts) : [];

    if (!Array.isArray(productsArray)) {
      productsArray = [];
    }

    productsArray = productsArray.concat(this.temporaryPokemonProduct);
    localStorage.setItem('pokemonProduct', JSON.stringify(productsArray));

    this.pokemonProduct.reset();
    this.temporaryPokemonProduct = [];

    this.productService.notifyWhenProductAdded()
  }
}
