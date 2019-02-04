const menuLi =  document.querySelectorAll('nav#main-menu li');

// setTimeout(() => {
//     menu.classList.add('expand');
// }, 400);


const directions = ['top', 'right', 'bottom', 'left'];
const classNames =  ['in', 'out'].reduce((total, cur) => total.concat(directions.map(dir => `${cur}-${dir}`)), [])
const getDirection = (e, el) => {
  const rect = el.getBoundingClientRect()
  const horPos = e.pageX - (rect.left + window.pageXOffset);
  const vertPos = e.pageY - (rect.top + window.pageYOffset);
  const x = (horPos - (rect.width/2) * (rect.width > rect.height ? (rect.height/rect.width) : 1));
  const y = (vertPos - (rect.height/2) * (rect.height > rect.width ? (rect.width/rect.height) : 1));
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
}

class Item {
  constructor(element) {
    this.el = element;
    this.el.addEventListener('mouseover', e => this.update(e, 'in'));
    this.el.addEventListener('mouseout', e => this.update(e, 'out'));
  }

  update(e, type) {
    this.el.classList.remove(...classNames);
    this.el.classList.add(`${type}-${directions[getDirection(e, this.el)]}`);
  }
}

menuLi.forEach(el => new Item(el));



