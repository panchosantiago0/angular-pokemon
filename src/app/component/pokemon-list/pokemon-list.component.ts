import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  editingPokemon: Pokemon | null = null; 
  pokemonForm: FormGroup;
  searchTerm: string = ''; 
  

  constructor(
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService
  ) {
    this.pokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      attack: ['', Validators.required],
      defense: ['', Validators.required],
      type: ['', Validators.required],
      image: ['']
    });

  }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }

  getPokemonTypeClass(type: string): string {
    switch (type) {
      case 'Acero':
        return 'type-steel';
      case 'Eléctrico':
        return 'type-electric';
      case 'Agua':
        return 'type-water';
      case 'Fuego':
        return 'type-fire';
      case 'Normal':
        return 'type-normal';
      default:
        return '';
    }
  }

  searchPokemon(): void {
    if (!this.searchTerm.trim()) {
      // Si el término de búsqueda está vacío, mostrar todos los Pokémon
      this.getPokemons();
    } else {
      // Si hay un término de búsqueda, llamar al servicio para buscar Pokémon
      this.pokemonService.searchPokemons(this.searchTerm).subscribe(
        pokemons => {
          // Actualizar la lista de Pokémon con los resultados de la búsqueda
          this.pokemons = pokemons;
        },
        error => {
          // Manejar el error en caso de que ocurra
          console.error('Error al buscar pokémon:', error);
          // Puedes mostrar un mensaje de error en la interfaz si lo deseas
        }
      );
    }
  }

  editPokemon(pokemon: Pokemon): void {
    this.editingPokemon = pokemon; // Asigna el pokémon seleccionado a la variable de edición
    // Prellenar el formulario con los valores del pokémon seleccionado
    this.pokemonForm.patchValue({
      name: pokemon.name,
      attack: pokemon.attack,
      defense: pokemon.defense,
      type: pokemon.type,
      image: pokemon.image
    });
  }

  onSubmit(): void {
    if (this.pokemonForm.valid) {
      if (this.editingPokemon) {
        
        this.updatePokemon();
      } else {
        
        this.createPokemon();
      }
    }
  }

 

  createPokemon(): void {
    this.pokemonService.createPokemon(this.pokemonForm.value).subscribe(
      (pokemon: Pokemon) => {
        console.log('Pokémon creado:', pokemon);
        this.resetForm();
        this.getPokemons(); 
      },
      (error) => {
        console.error('Error al crear el pokémon:', error);
      }
    );
  }

  updatePokemon(): void {
    const updatedPokemon: Pokemon = { ...this.editingPokemon, ...this.pokemonForm.value };
    this.pokemonService.editPokemon(updatedPokemon).subscribe(
      (pokemon: Pokemon) => {
        console.log('Pokémon editado:', pokemon);
        this.resetForm();
        this.getPokemons(); 
      },
      (error) => {
        console.error('Error al editar el pokémon:', error);
      }
    );
  }

  resetForm(): void {
    this.editingPokemon = null;
    this.pokemonForm.reset();
  }

  reloadPage(): void {
    location.reload();
  }
  
}
