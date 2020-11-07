export class Section {
  constructor ( {renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(Items) {
    Items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element, place) {
    if (place === 'append') {
      this._containerSelector.append(element);
    } else {
      this._containerSelector.prepend(element);
    }
  }

}

