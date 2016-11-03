export default {
  isFn: obj => obj && 'function' === typeof obj,
  extend: (dest) => {
    const extended = dest;
    let i;
    let j;
    let len;
    let src;

    for (j = 1, len = arguments.length; j < len; j++) {
      src = arguments[j];
      for (i in src) {
        if ({}.hasOwnProperty.call(src, i)) {
          extended[i] = src[i];
        }
      }
    }
    return extended;
  }
};
