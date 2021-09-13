import Abstract from '../classes/abstract.js';

const RenderPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'after',
};

const isEmpty = (list) => list.length === 0;
const isNotEmpty = (list) => list.length !== 0;

const render = (container, child, place = RenderPlace.BEFORE_END) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPlace.AFTER_END:
      container.after(child);
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

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || newChild === null) {
    throw new Error('Can\'t replace non existent elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export {renderTemplate, createElement, RenderPlace, render, isEmpty, isNotEmpty, replace, remove};
