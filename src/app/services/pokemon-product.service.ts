import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonProductService {
  private productAddedSubject = new Subject<void>();
  productAdded$ = this.productAddedSubject.asObservable();

  notifyWhenProductAdded() {
    this.productAddedSubject.next();
  }
  constructor() { }
}
