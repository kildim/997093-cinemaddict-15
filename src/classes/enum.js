// Реализация типа 'перечисление'
// Источник - https://myrusakov.ru/js-enum-type.html

export default class Enum {
  constructor(obj) {
    const newObj = {};

    for( const prop in obj )
    {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) {

        newObj[prop] = Symbol(obj[prop]);
      }
    }

    return Object.freeze(newObj);
  }
}
