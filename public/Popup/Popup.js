class Popup {
  constructor() {
    this.self = ` <div class="popup">
                        <h2 class="txt">Same text Popup</h2>
                  </div>`
    document.body.insertAdjacentHTML(`afterbegin`, this.self)
  }
  show(messageUser) {
    document.querySelector(`.popup`).classList.add(`show`)
    document.querySelector(`.txt`).textContent = messageUser
  }

  hide() {
    document.querySelector(`.popup`).classList.remove(`show`)
  }
}

export default new Popup();

