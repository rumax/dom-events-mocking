/* global describe, it, expect, beforeAll, afterAll, jasmine b:true */
import DomEvents from '../src/';

describe('DOM events', () => {
  let events;
  let div = null;
  let listener = null;
  const eventTypes = [
    'click',
    'dblclick'
  ];
  const checkEvent = (eventName) => {
    it(eventName, (done) => {
      listener = (evt) => {
        expect(evt.type).toBe(eventName);
        done();
      };

      div.addEventListener(eventName, listener);
      events[eventName](div).done();
    });
  };

  beforeAll(() => {
    events = new DomEvents();
    div = document.createElement('div');
  });

  for (let i = 0, cnt = eventTypes.length; i < cnt; ++i) {
    checkEvent(eventTypes[i]);
  }

  afterAll(() => {
    if (null !== div) {
      if (listener) {
        div.removeEventListener(listener);
        listener = null;
      }

      div = null;
    }
  });
});
