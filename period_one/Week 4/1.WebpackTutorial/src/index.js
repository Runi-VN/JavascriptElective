import _ from 'Lodash';
import './style.css';
import Cat from './cat.png';
import printMe from './print.js';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  const myCat = new Image();
  myCat.src = Cat;
  element.appendChild(myCat);
  return element;
}

document.body.appendChild(component());
