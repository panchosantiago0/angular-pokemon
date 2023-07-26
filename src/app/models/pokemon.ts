export class Pokemon {
    id: number;
    name: string;
    attack: string;
    defense: string;
    image: string;
    type: string;  
    
    constructor(id: number, name: string, attack: string,defense: string, image: string, type: string){
      this.id = id;
      this.name = name;
      this.attack = attack;
      this.defense = defense;
      this.image = image;
      this.type = type;
    }
    
  }
  