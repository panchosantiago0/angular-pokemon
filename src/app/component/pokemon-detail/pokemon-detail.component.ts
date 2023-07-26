import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // Obtener el ID del parámetro de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Llamar a la función getPokemons() en lugar de getPokemonById()
    this.pokemonService.getPokemons().subscribe(pokemons => {
      // Buscar el Pokémon con el ID correspondiente en la lista de Pokémones
      this.pokemon = pokemons.find(pokemon => pokemon.id === id);
    });
  }
}
