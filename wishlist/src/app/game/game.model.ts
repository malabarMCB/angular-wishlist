export class Game {
  id: string;
  name: string;
  price: number;
  coverUrl: string;

  constructor(id: string, name: string, price: number, coverUrl: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.coverUrl = coverUrl;
  }
}
