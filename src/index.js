import { TweenLite } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('title');

  TweenLite.to(title, 1.5, { backgroundColor: '#ffdd00' });
});
