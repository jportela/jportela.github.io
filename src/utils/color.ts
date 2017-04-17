const DARK_THRESHOLD = 100;

export class Color {
  r: number
  g: number
  b: number

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  isDark() {
    return this.r < DARK_THRESHOLD || 
      this.g < DARK_THRESHOLD ||
      this.b < DARK_THRESHOLD;
  }

  toHexString() {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`;
  }
}

export const BLACK = new Color(0, 0, 0);
export const WHITE = new Color(255, 255, 255);


export function getRandomColor() {
  return new Color(
    getRandomHex(),
    getRandomHex(),
    getRandomHex()
  )
}

function getRandomHex() {
   return Math.ceil(Math.random() * 256);
}