
export default class Card {
  constructor(nameOfCard, imageOfCard) {
    this.nameOfCard = nameOfCard;
    this.imageOfCard = imageOfCard;
    this.element = null;
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this)

  }

  like() {
    this.element.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  remove() {
    this.element.remove();
  }

  create() {
    // Можно лучше
    // использовать тэг <template> https://developer.mozilla.org/ru/docs/Web/HTML/Element/template
    // в связке с Fragment https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    this.element = document.createElement('div');
    this.element.classList.add('place-card');
  /*REVIEW4. Надо лучше. Лучше, чтобы данные this.imageOfCard и this.nameOfCard вводились не в шаблонной строке template и вставлялись с помощью метода
  insertAdjacentHTML как размётка, а вводились в свойства элементов как текстовые данные после инструкции
  this.element.insertAdjacentHTML('afterbegin', template);. Этим бы предотвратилась угроза компьютерной безопасности, так как, если значения this.imageOfCard
  и this.nameOfCard будут браться из каких-то внешних по отношению к проекту данных, в них могут быть вместо параметров карточки вредоносные скрипты,
  или размётка, которые при вставке через insertAdjacentHTML могут выполниться на странице. Об insertAdjacentHTML можно прочитать здесь
  https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML, об ещё более опасном свойстве innerHTML здесь:
  https://developer.mozilla.org/ru/docs/Web/API/Element/innerHTML    */
    const template = `<div class="place-card__image" data-url="${this.imageOfCard}" style="background-image: url(${this.imageOfCard})">
    <button class="place-card__delete-icon"></button>
</div>
<div class="place-card__description">
    <h3 class="place-card__name">${this.nameOfCard}</h3>
    <button class="place-card__like-icon"></button>
</div>`;
    this.element.insertAdjacentHTML('afterbegin', template);
    this.setListeners()

    return this.element;

  }

  setListeners() {
    this.element.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.element.querySelector('.place-card__like-icon').addEventListener('click', this.like);
  }
}



