import Abstract from '../classes/abstract.js';

const RenderPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'after',
};

const render = (container, child, place = RenderPlace.BEFORE_END) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPlace.AFTER_END:
      container.prepend(child);
      break;
    case RenderPlace.BEFORE_END:
      container.append(child);
      break;
  }
};

const renderTemplate = (container, template, place = RenderPlace.BEFORE_END) =>
  container.insertAdjacentHTML(place, template);

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template.trim();

  return newElement.firstChild;
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export {getRandomInteger, renderTemplate, createElement, RenderPlace, render};
