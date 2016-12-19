DOM events mocking
[![npm version](https://badge.fury.io/js/dom-events-mocking.svg)](https://badge.fury.io/js/dom-events-mocking) [![CircleCI](https://circleci.com/gh/rumax/dom-events-mocking.svg?style=svg)](https://circleci.com/gh/rumax/dom-events-mocking)

=============

Wraps the DOM API to make real events mocking in the browser using method chaining.

> npm install --save dome-events


Implements the following DOM events methods and helpers:
  - `click`
  - `dblclick`
  - `drag`
  - `at`
  - `wait`
  - `exec`
  - `async`
  - `done`
  - etc.


## Why Do I Need This?

If you want to test your application and want/can use JavaScript only, but still cover UI events. Or write some integration tests:

```js
it('Can handle my events', (done) => {
  const btn = document.getElelemntById('YOUR_BUTTON');

  events
    .click(btn)
    .exec(() => {
      expect('YOUR_VALIDATION').toBeTruthy();
    })
    .click(() => {
      // Dynamically created button
      return document.getElelemntById('YOUR_NEW_BUTTON');
    })
    .exec(() => {
      expect('YOUR_ANOTHER_VALIDATION').toBeFalsy();
    })
    .done(() => {
      // Final validations
      console.log('All steps executed');
      done();
    });
});
```

![Demo](https://raw.githubusercontent.com/rumax/dom-events-mocking/develop/res/click.gif)

Based on [happen](https://www.npmjs.com/package/happen).

## License

BSD-2-Clause
