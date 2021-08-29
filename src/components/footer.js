import Abstract from '../classes/abstract.js';

export default class Footer extends Abstract {

  constructor(films) {
    super();
    this._films = films;
  }

  _createFooterTemplate() {
    return `<section class="footer__statistics">
    <p>${this._films.length} movies inside</p>
  </section>`;
  }

  getTemplate()  {
    return this._createFooterTemplate();
  }
}
