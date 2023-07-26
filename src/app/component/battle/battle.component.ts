import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  pokemons: any[] = [];
  pokemonA: { name: string, type: string, attack: string, image: string } = { name: '', type: '', attack: '', image: '' };
  pokemonB: { name: string, type: string, defense: string, image: string } = { name: '', type: '', defense: '', image: '' };
  attackA: number = 0;
  defenseB: number = 0;
  damage: number = 0;
  result: string = '';
  mostrarImagen = false;
  calculated = false; 

  // Tabla de factores de impacto
  impactFactors: { [key: string]: { [key: string]: number } } = {
    Agua: { Agua: 0.5, Eléctrico: 2.0, Fuego: 0.5, Acero: 0.5, Normal: 1.0 },
    Eléctrico: { Agua: 1.0, Eléctrico: 0.5, Fuego: 1.0, Acero: 0.5, Normal: 1.0 },
    Fuego: { Agua: 2.0, Eléctrico: 1.0, Fuego: 0.5, Acero: 0.5, Normal: 1.0 },
    Acero: { Agua: 1.0, Eléctrico: 1.0, Fuego: 2.0, Acero: 0.5, Normal: 0.5 },
    Normal: { Agua: 1.0, Eléctrico: 1.0, Fuego: 1.0, Acero: 1.0, Normal: 1.0 },
  };

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  imagenPokemonA() {
    return this.pokemonA.image;
  }

  imagenPokemonB() {
    return this.pokemonB.image;
  }

  calculateDamage(): void {
    this.mostrarImagen = true;

    if (!this.pokemonA || !this.pokemonB) {
      this.result = 'Debes seleccionar dos Pokémon para calcular el daño.';
      return;
    }

    console.log(this.pokemonA);
    console.log(this.pokemonA.attack);
    console.log(this.pokemonB);

    const factor = this.impactFactors[this.pokemonA.type][this.pokemonB.type];
    console.log(factor);

    const ataqueA = parseInt(this.pokemonA.attack, 10); // base 10 para números decimales
    const defensaB = parseInt(this.pokemonB.defense, 10); 

    this.damage = (ataqueA - defensaB) * factor;
    if (this.damage > 0) {
      this.result = `${this.pokemonA.name} es el ganador!`;
    } else if (this.damage < 0) {
      this.result = `${this.pokemonB.name} es el ganador!`;
    } else {
      this.result = 'Es un empate!';
    }

    this.calculated = true; 
  }
}
