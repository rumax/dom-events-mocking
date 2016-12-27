import events from 'happen';
import utils from './utils';

const X = 0;
const Y = 0;

events.at = (type, x, y, props, which = 1) => {
  const el = document.elementFromPoint(x, y);

  events.once(el, utils.extend({
    type,
    clientX: x,
    clientY: y,
    screenX: x,
    screenY: y,
    which,
    button: 0
  }, props || {}));
};


events.drag = (from, to, then, step = 5) => {
  let fromX = from[X];
  let fromY = from[Y];
  const toX = to[X];
  const toY = to[Y];
  const dirX = fromX < toX ? step : -step;
  const dirY = fromY < toY ? step : -step;
  const moveDone = () => {
    events.at('mouseup', toX, toY);
    events.mouseClickAt(toX + 1, toY + 1);
    if (then) {
      then();
    }
  };
  const move = () => {
    let done = true;

    if (step < Math.abs(fromX - toX)) {
      fromX += dirX;
      done = false;
    }

    if (step < Math.abs(fromY - toY)) {
      fromY += dirY;
      done = false;
    }

    if (false === done) {
      events.at('mousemove', fromX, fromY);
      window.setTimeout(move, 0);
    } else {
      moveDone();
    }
  };

  events.at('mousemove', fromX, fromY);
  events.at('mousedown', fromX, fromY);
  move();
};


events.drawingClick = (x, y) => {
  this.at('mousedown', x, y);
  this.at('mouseup', x, y);
};


events.mouseClickAt = (x, y, props) => {
  events.at('mousemove', x, y, props);
  events.at('click', x, y, props);
  events.at('mousedown', x, y, props);
  events.at('mouseup', x, y, props);
};


events.contextmenuAt = (x, y, props) => {
  events.at('mousemove', x, y, props);
  events.at('contextmenu', x, y, props, 3);
  events.at('mousedown', x, y, props);
  events.at('mouseup', x, y, props);
};


export default events;
