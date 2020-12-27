class PopupAlert {
  constructor() {
    this.self = document.createElement('div');
    this.self.classList.add('popup-alert');
    this.self.textContent = 'Popup-alert';
    document.body.append(this.self);
  }
  showPopuTexst(sameText) {
    this.self.classList.add(`show-alert`);
    this.self.textContent = sameText;
    setTimeout(() => { this.hidePopuTexst() }, 1500)
  }

  hidePopuTexst() {
    this.self.classList.remove('show-alert');
  }
}

export default new PopupAlert();
