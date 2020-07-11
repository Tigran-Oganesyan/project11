import '../src/pages/style.css'

import Api from './js/Api';
import Card from './js/Card';
import CardList from './js/CardList';
import FormValidator from './js/FormValidator';
import UserInfo from './js/UserInfo';
import CreateCardPopup from './js/CreateCardPopup';
import EditAuthorPopup from './js/EditAuthorPopup';
import ImagePopup from './js/ImagePopup';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort10' : 'https://praktikum.tk/cohort10';

/* Переменные */

const placesList = document.querySelector('.places-list');
// Переменная не используется

const userInfoButton =  document.querySelector('#add-new-card-button');
const editInfoButton =  document.querySelector('#save-new-info-button');

const api = new Api('cohort10', '83548d77-7f72-4ceb-b00b-e462bb018807');




const arrEmpty = [];
// ========
const formCard = document.forms.new;
const formUser = document.forms.edit;
// ========
const createCard = (name, link) => (new Card(name, link));
const cardList = new CardList(placesList, arrEmpty, createCard);

api.loadCards()
  .then(result => {
    arrEmpty.push(...result);
    cardList.render();
    console.log(arrEmpty);
  })
  .catch(error => console.error(`Ошибка загрузки: ${error}`));

const imagePopup = new ImagePopup(document.querySelector('#img-zoom'));

const userInfo = new UserInfo({
  element: document,
});

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
    userInfo.updateUserInfo(data.authorValue, data.infoValue, data.avatarInfo);
  })
  .catch(error => console.error(`Ошибка загрузки: ${error}`));

const editAuthorPopup = new EditAuthorPopup(document.querySelector('#edit-author'), userInfo);

const createCardPopup = new CreateCardPopup(document.querySelector('#create-card'), createCard, cardList);

const editFormValidity = new FormValidator(formUser);

const newCardFormValidity = new FormValidator(formCard);

// Можно лучше
// Стрелочные функции для коллбэков (event) => {...}
document.querySelector('.user-info__button').addEventListener('click', function (event) {
  createCardPopup.reset();
  createCardPopup.open();
  newCardFormValidity.setEventListeners();
  newCardFormValidity.clearErrors();
  newCardFormValidity.setSubmitButtonState(userInfoButton, false) ;
});

document.querySelector('.user-info__edit').addEventListener('click', function (event) {

  editAuthorPopup.open();
  editAuthorPopup.reset();
  editAuthorPopup.loadUserInfo();
  editFormValidity.setEventListeners();
  editFormValidity.clearErrors();
  editFormValidity.setSubmitButtonState(editInfoButton,true) ;

});


// В идеале слушатель клика для зума должен быть частью класса ImagePopup
/*REVIEW4. Надо лучше. Лучше и обработчик события открытия большого фото добавлять на элемент карточки без использования делегирования в классе Card,
как Вы это делаете для обработчиков лайка и удаления карточки. В этом случае в параметры класса Card надо будет передать, как колбэк-функцию
imagePopup.setBackground. Так же в этом случае параметром метода setBackground лучше сделать не элемент карточки, а переменную, принимающую
значение ссылки на карточку. Тогда в классе Card методу setBackground как аргумент могла бы быть передана ссылка this.imageOfCard и
этот метод не зависел бы от того, что Вы определили в шаблоне карточки атрибут data-url.  */
placesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('place-card__image')) {
    imagePopup.setBackground(event.target);
  }
});





/*REVIEW. Резюме.

Функционал задания работает правильно, кроме валидации формы карточки.

Взаимодействие с сервером происходит, но нужно исправление неточностей.

Что надо исправить прежде всего (давайте сналала разберёмся с сервером и функцией clearError, а затем надо будет поработать над валидацией формы карточки
и классом FormValidator).

1. Нужно методы, которые должны обрабатывать ответ сервера после отсылки туда информации о пользователе, занести в метод then асинхронной
обработки ответа сервера (подробный комментарий в файле класса EditAuthorPopup).

2. clearError надо сделать методом класса FormValidator (подробный комментарий в этом файле).

__________________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

Работа формы профиля при сабмите теперь происходит правильно.


Что нужно исправить.

1. Сделать корректировку метода userInfo.updateUserInfo (подробные комментарии в файле класса EditAuthorPopup).

2. Сделать корректировку класса FormValidator, чтобы он не был зависим от размётки (подробные комментарии в файле класса FormValidator).

3. При первом входе в форму карточки и ввода в поле названия карточки валидной инфориации, становится активной кнопка сабмита при пустой ссылке
(смотрите снимок экрана Снимок экрана в 2020-06-05 11-31-41.png в корне Вашего проекта). Также при повторном входе в форму карточки, она
сразу же открывается с активной кнопкой сабмита - чтобы устранить эту ошибку нужно в слушателе открытия этой формы делать кнопку неактивной.
Исправьте все указанные ошибки и протестируйте работу формы карточки во всех случаях, возможно есть и другие ошибки.

4. Нужно, чтобы при открытии формы профиля, кнопка сабмита на ней была в активном состоянии, так как так должно быть в соответствии со
стандартами пользовательского интерфейса при валидной информации в полях формы.



__________________________________________________________________________________________________________________________________________________

REVIEW3. Резюме3.

Формы стали валидироваться правильно (см. комментарий по этому поводу в классе FormValidator).

Что надо улучшить.

1. Надо убрать из класса EditAuthorPopup определение свойства this.avatarInfo, так как пользователь в форме профиля с аватаром не работает
(подробный комментарий в файле класса EditAuthorPopup).

2. В классе UserInfo можно на каждое свойство объекта с информацией пользователя, который возвращает сервер,
 завести свой геттер и сеттер и работать с каждым свойством по отдельности, учитывая когда какое свойство надо использовать
 (подробный комментарий в файле класса UserInfo).


Что нужно исправить (мелкие, но принципиальные ошибки).

1. Надо метод класса Card setListeners вызывать в методе create класса Card, а из класса CardList убрать (комментарии
в файлах классов Card и CardList).

2.  Надо при вызове метода api.setUserProfile в классе EditAuthorPopup, передавать этому методу 2 аргумента, а не три
(подробный комментарий в файле класса EditAuthorPopup).


__________________________________________________________________________________________________________________________________________________

REVIEW4. Резюме4.

Что нужно лучше.

1. Лучше, чтобы данные this.imageOfCard и this.nameOfCard вводились не в шаблонной строке template и вставлялись с помощью метода
  insertAdjacentHTML как размётка, а вводились в свойства элементов как текстовые данные после инструкции
  this.element.insertAdjacentHTML('afterbegin', template); (подробный комментарий в файле класса Card).

2. Не надо делать закрытие формы профиля раньше, чем придёт ответ от сервера (подробный комментарий в файле класса EditAuthorPopup).

3. Лучше и обработчик события открытия большого фото добавлять на элемент карточки без использования делегирования в классе Card
(подробный комментарий в этом файле).

Работа принимается.



*/
