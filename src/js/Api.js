
export default class Api {

  constructor(options) {

    this.options = options;
    this.url = options.baseUrl;
    this.headers = this.options.headers

 }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,

    })
      .then(res => this.parseResponce(res))
      .catch(error => Promise.reject(`Ошибка: ${error}`))

  }

  loadCards() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers:this.headers,
      
    })
      .then(res => this.parseResponce(res))
      .catch(error => Promise.reject(`Ошибка: ${error}`))

  }


  setUserProfile(newName, newAbout) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: `${newName}`,
        about: `${newAbout}`
      })
    })
      .then(res =>this.parseResponce(res))
       
      .catch(error => Promise.reject(`Ошибка: ${error}`))
  }

  // Повторяющийся код вынесен в метод -- отлично!
  parseResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

}

