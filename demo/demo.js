import DomEvents from '../src/dom-events';

const events = new DomEvents();
const testArea = document.getElementsByClassName('test-area')[0];
const clickbleArea = document.getElementsByClassName('clickble-area')[0];
const bindAllEvents = (element, callback) => {
  window.element = element;
  let key;

  for (key in element) {
    if (key.indexOf('on') === 0) {
      element.addEventListener(key.slice(2), callback);
    }
  }
};
const createPoint = (x, y, className) => {
  const point = document.createElement('div');
  point.classList.add('point');
  if (className) {
    point.classList.add(className);
  }
  point.style.left = `${x}px`;
  point.style.top = `${y}px`;
  return point;
};
const cleanPoints = () => {
  testArea.innerHTML = 'Test area';
  clickbleArea.innerHTML = 'Actions area';
};

bindAllEvents(testArea, (evt) => {
  const point = createPoint(evt.x, evt.y, 'evented');
  point.innerHTML = `${evt.type}: [${evt.x}, ${evt.y}]`;
  testArea.appendChild(point);
});

document.getElementsByTagName('button')[0].addEventListener('click', () => {
  const form = document.querySelector('.controls');
  const x = parseFloat(form.x.value);
  const y = parseFloat(form.y.value);
  const opts = {
    clientX: x,
    clientY: y,
    screenX: x,
    screenY: y
  };

  events
    .exec(cleanPoints)
    .exec(() => {
      testArea.appendChild(createPoint(x, y));
    })
    .click(testArea, opts)
    .wait(100)
    .done(() => {});
});


clickbleArea.addEventListener('click', (evt) => {
  const border = 5;
  const x = evt.pageX - clickbleArea.offsetLeft - border;
  const y = evt.pageY - clickbleArea.offsetTop - border;
  const opts = {
    clientX: x,
    clientY: y,
    screenX: x,
    screenY: y
  };

  events
    .exec(cleanPoints)
    .exec(() => {
      clickbleArea.appendChild(createPoint(x, y));
    })
    .click(testArea, opts)
    .wait(100)
    .done(() => {});
});
