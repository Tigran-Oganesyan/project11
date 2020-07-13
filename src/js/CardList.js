
 export default class CardList {
  constructor(container, array, createCard) {
    this.container = container;
    this.createCard = createCard;
    this.array = array
  }

  addCard(card) {
    this.container.appendChild(card);
  }

  render() {
    this.array.forEach(data => {
      const card = this.createCard(data.name, data.link);
      const cardElem = card.create();
      this.addCard(cardElem);
    });
  }
}