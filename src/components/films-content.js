import Abstract from '../classes/abstract.js';

export default class FilmsContent extends Abstract {
  _createFilmsContentTemplate() {
    return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>

    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
    </section>

    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>
  </section>`;
  }

  getTemplate()  {
    return this._createFilmsContentTemplate();
  }
}
