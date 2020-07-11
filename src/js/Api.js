export default class Api {

  constructor(groupId, token) {
    this.baseUrl = `https://praktikum.tk/${groupId}`;
    this.token = token;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      }

    })
      .then(res => this.parseResponce(res))
      .catch(error => Promise.reject(`Ошибка: ${error}`))

  }

  loadCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.token,
      }
    })
      .then(res => this.parseResponce(res))
      .catch(error => Promise.reject(`Ошибка: ${error}`))

  }


  setUserProfile(newName, newAbout) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
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

