
export default class UserInfo {
  // Отлично, заданы значения по умолчанию
  constructor({ name , info , avatar, element }) {
    this.authorName = name;
    this.authorInfo = info;
    this.avatarInfo = avatar;
    this.avatarElement = element.querySelector('.user-info__photo');
    this.userNameElement = element.querySelector('.user-info__name');
    this.userInfoElement = element.querySelector('.user-info__job');
    this.updateUserInfo();
  }

  setUserInfo(authorName, authorInfo,avatarInfo) {
    this.authorName = authorName;
    this.authorInfo = authorInfo;
    this.avatarInfo = avatarInfo;
  }

  updateUserInfo() {
    this.userNameElement.textContent = this.authorName;
    this.userInfoElement.textContent = this.authorInfo;
    this.avatarElement.style.backgroundImage = `url(${this.avatarInfo})`;
  }

/*REVIEW3. Можно лучше. Подумайте всё-таки на досуге - в классе UserInfo можно на каждое свойство объекта с информацией пользователя, который возвращает сервер,
 завести свой геттер и сеттер и использовать их по отдельности, когда это надо. О сеттерах и геттерах можно прочитать здесь
 https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/set ).
 При работе с формой профиля, пользователь не меняет картинку аватара, поэтому, хоть сервер и возвращает ссылку
 на эту картинку, она в случае работы с формой профиля не должна меняться.*/
  getUserInfo() {
    return { authorName: this.authorName, authorInfo: this.authorInfo, avatarInfo: this.avatarElement.style.backgroundImage }
  }
}



