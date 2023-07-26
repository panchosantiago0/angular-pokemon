import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent {
  @Input() editingPokemon: Pokemon | null = null;
  pokemonForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private pokemonService: PokemonService) {
    this.pokemonForm = this.formBuilder.group({
      name: ['', Validators.required],
      attack: ['', Validators.required],
      defense: ['', Validators.required],
      type: ['', Validators.required],
      image: ['']
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
  reloadPage(): void {
    location.reload();
  }

  createPokemon(): void {
    this.pokemonService.createPokemon(this.pokemonForm.value).subscribe(
      (pokemon: Pokemon) => {
        console.log('Pokémon creado:', pokemon);
        this.resetForm();
      },
      (error) => {
        console.error('Error al crear el pokémon:', error);
      }
    );
  }

  updatePokemon(): void {
    if (this.editingPokemon) {
      const updatedPokemon: Pokemon = { ...this.editingPokemon, ...this.pokemonForm.value };
      this.pokemonService.editPokemon(updatedPokemon).subscribe(
        (pokemon: Pokemon) => {
          console.log('Pokémon editado:', pokemon);
          this.resetForm();
        },
        (error) => {
          console.error('Error al editar el pokémon:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.editingPokemon = null;
    this.pokemonForm.reset();
  }
  showForm: boolean = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }
}
