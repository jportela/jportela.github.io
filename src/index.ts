import { TweenLite } from 'gsap';

import { Color, getRandomColor, WHITE, BLACK } from './utils/color';

import '../styles/main.css';

const DURATION = 2;
const DELAY = 5;

function changeBackground(element: Element, fromColor: Color) {
  
  const toColor = getRandomColor();
  const fromFontColor = fromColor.isDark() ? WHITE : BLACK;
  const toFontColor = toColor.isDark() ? WHITE : BLACK;

  TweenLite.fromTo(element, DURATION, {
    backgroundColor: fromColor.toHexString(),
    color: fromFontColor.toHexString(),
  }, {
    backgroundColor: toColor.toHexString(),
    color: toFontColor.toHexString(),
    onComplete: () => setTimeout(() => changeBackground(element, toColor), DELAY * 1000),
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.container');

  changeBackground(title, new Color(255, 255, 255));
});
