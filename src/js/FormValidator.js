export default class FormValidator {

  constructor(form) {
    // Получаем форму и забираем из нее наши спаны с ошибками предварительно сделая из них массив
    this.form = form;
    this.error = Array.from(this.form.querySelectorAll('.error'))
  }
  // установим слушатель инпут на форму, забираем кнопку и массив инпутов, дальше происходит какая магия.
  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      const button = event.currentTarget.querySelector('.popup__button');
      const inputs = Array.from(event.currentTarget.querySelectorAll('input'));
      this.isFieldValid(event.target)
      // проверяем каждый инпут в методе check. если методод вернул true то отправляем в метод кнопки кнопку и  state === true или иначе
      if (inputs.every(this.checkInputValidity)) {
        this.setSubmitButtonState(button, true)
      } else {
        this.setSubmitButtonState(button, false)
      }
    });
  }

  // Магия.
  // Чтобы динамично отображать инпуты ищем их по id инпута + '-error'
  isFieldValid(input) {
    const errorElement = this.form.querySelector(`#${input.id}-error`);
    // инпут проверяется, а в элемент ошибки в случае ошибки добавляется сообщение об ошибке на уровне html - нативное, здесь важно последовательность соблюдать - поменяй строчки местами  - все сломается, нативка будет чередаваться с кастомным методом.
    this.checkInputValidity(input)
    errorElement.textContent = input.validationMessage;
  }



  // Тут мы меняем кнопку и ее состояние , сделай так чтобы кнопка была всегда disabled при открытии
  setSubmitButtonState(button, state) {
    if (state === true) {
      button.classList.add('popup__button-active');
      button.removeAttribute('disabled');
    } else {
      button.classList.remove('popup__button-active');
      button.setAttribute('disabled', 'disabled');
    }
  }







  // метод который проверил ввод в инпут и выдает КАСТОМНОЕ сообщение, метод не совсем масштабируемый, чтобы использовать массив с разными языками нужно немного переделать, но всем лень и мне тоже
  checkInputValidity(input) {
    // Если нет проблем то пусто! КАСТОМ!
    input.setCustomValidity('');
    // пустота
    if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле');
      return false;
    }
    // длина
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity('От 2 до 30 символов');
      return false
    }
    // ссылка
    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
      return false
    }
    // в случае успеха метод чекВалидити возвращает тру, ну или что то похожее
    return input.checkValidity();
  }

  // Обнулем, но не срок - добавь куда надо чтобы работало
  clearErrors() {
    this.error.forEach((er) => {
      er.textContent = "";
    })
  }
}


