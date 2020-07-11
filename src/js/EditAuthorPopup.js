import { Popup } from './Popup';
export default class EditAuthorPopup extends Popup {
  constructor(element, userInfo) {
    super(element);
    // Можно лучше -- передать не всю сущность UserInfo а только необходимые методы
    this.userInfo = userInfo;
    this.editAuthorForm = this.element.querySelector('form');
    this.author = this.editAuthorForm.elements.author;
    this.info = this.editAuthorForm.elements.info;
    // Можно лучше
    // название не сильно говорящее, а вот setListeners было бы подходящим
    this.methodedit();
  }

  methodedit() {
    this.editAuthorForm.addEventListener('submit', this.submit.bind(this));
  }


  loadUserInfo() {
    // Деструктуризация -- супер!
    const { authorName, authorInfo ,} = this.userInfo.getUserInfo();
    this.author.value = authorName;
    this.info.value = authorInfo;
  }




  submit(event) {
    event.preventDefault();
    const authorValue = this.author.value;
    const infoValue = this.info.value;
    /*REVIEW4. Надо подумать. Смотрю - почему у Вас форма раньше закрывается, чем придёт ответ от сервера, несмотря на все наши старания. А это от того,
    оказывается, что Вы зачем-то вызываете здесь эту функцию из глобальной области видимости renderLoading. Здесь её вызывать не надо, и, если она
    действительно нужна где-нибудь, сделайте её методом класса. */
    //renderLoading(true)
    api.setUserProfile(authorValue, infoValue)
    .then(data =>{
       this.userInfo.setUserInfo(data.name, data.about, data.avatar);
       this.userInfo.updateUserInfo();
       //this.close();
       this.loadUserInfo();
       this.close();
    })

  .catch(error => {renderLoading(false)
    console.error(`Ошибка загрузки: ${error}`)})
  }

  reset() {
    this.editAuthorForm.reset();
  }
}

function renderLoading(isLoading) {
  if (isLoading) {
    editAuthorPopup.close();
  } else {

    editAuthorPopup.open();
  }
}


