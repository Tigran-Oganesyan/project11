
import { Popup } from './Popup';
export default class EditAuthorPopup extends Popup {
  constructor(element, userInfo, api) {
    super(element);
    this.userInfo = userInfo;
    this.editAuthorForm = this.element.querySelector('form');
    this.author = this.editAuthorForm.elements.author;
    this.info = this.editAuthorForm.elements.info;
    this.api = api;
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
    //renderLoading(true)
    this.api.setUserProfile(authorValue, infoValue)
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


