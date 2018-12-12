// This ensures that dbUri points to a new, test database
// (See /config/environment to see how)
process.env.NODE_ENV = 'test';
// All future requires will be run through babel and translated
// to ES5. This makes sure that jsx (<BurgersIndex /> etc.)
// is converted to React.createElement(...)
// https://babeljs.io/docs/en/babel-register
require('@babel/register')();
require('@babel/polyfill');
// =========================================================
// This section ensures that requies involving static files,
// like css and images are just ignored
function nullFunc() {
  return null;
}

require.extensions['.css'] = nullFunc;
require.extensions['.scss'] = nullFunc;
require.extensions['.png'] = nullFunc;
require.extensions['.jpg'] = nullFunc;
// =========================================================

// enzyme is AirBnb's React testing tool. It is able to render React components
// on their own, in order to test them.
// It has two rendering modes, `shallow`,
// which renders no React children, but only the top-level React component,
// and `mount` which renders the React component fully, including all
// children.
// For example:
// enzyme.shallow(<Header />)
// enzyme.mount(<BurgerShow id={myBurgerId} />)
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
// =========================================================

// JSDOM is a "headless browser". It's job is to turn HTML in a
// DOM, just like a real browser. But it doesn't have things like
// `window`, `atob` and `localStorage` etc. which a real browser _would_ have.
// So we create dummy versions of these things later...
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost:8000/'
});
const { window } = jsdom;

window.localStorage = (function(){
  var storage = {};

  return {
    getItem: function(key) {
      return storage[key];
    },
    removeItem: function(key) {
      delete storage[key];
    },
    setItem: function(key, item) {
      storage[key] = item;
    }
  };
})();
global.localStorage = window.localStorage;


function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}
global.atob = require('atob');
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);

documentRef = document; //eslint-disable-line no-undef
// =========================================================
