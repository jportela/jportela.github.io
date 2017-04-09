import { TweenLite } from 'gsap';

import '../styles/main.css';

function getRandomColor() {
  const g = Math.ceil(Math.random() * 256).toString(16);
  const b = Math.ceil(Math.random() * 256).toString(16);
  const r = Math.ceil(Math.random() * 256).toString(16);

  return `#${r}${g}${b}`;
}

function changeBackground(element, from) {
  const toColor = getRandomColor();
  TweenLite.fromTo(element, 1.5, {
    backgroundColor: from,
  }, {
    backgroundColor: toColor,
    onComplete: () => changeBackground(element, toColor),
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('title');

  changeBackground(title, '#ffffff');
});
