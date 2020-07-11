import { Popup } from './Popup';
export default class ImagePopup extends Popup {
  constructor(element) {
    super(element);
  }


  setBackground(targetImage) {
    const url = targetImage.dataset.url;
    document.querySelector('.popup__image').setAttribute('src', url);
    this.open();
  }
}