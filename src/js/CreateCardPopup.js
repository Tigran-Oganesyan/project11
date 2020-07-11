import { Popup } from './Popup';
export default class CreateCardPopup extends Popup {
  constructor(element, createCard, cardList) {
    super(element);
    this.createCard = createCard;
    // Можно лучше -- передать только метод addCard а не весь класс
    this.cardList = cardList;
    // Можно лучше
    // Форму лучше передать сюда уже элементом, а не брать из DOM в констркторе
    this.newCardForm = this.element.querySelector('form');
    this.name = this.newCardForm.elements.name;
    this.link = this.newCardForm.elements.link;
    this.methodnew();

  }

  methodnew() {
    this.newCardForm.addEventListener('submit', this.submit.bind(this));
  
  }

  submit(event) {
    event.preventDefault();
    const card = this.createCard(this.name.value, this.link.value);
    const cardElem = card.create();
    this.cardList.addCard(cardElem);
    card.setListeners();
    this.reset();
    this.close();
  }

  reset() {
    this.newCardForm.reset();
  }
}