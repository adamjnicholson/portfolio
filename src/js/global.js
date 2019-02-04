{
  const globalEls = {
    inputs: document.querySelectorAll('.input-container *:last-child'),
    toggles: document.querySelectorAll('.toggle'),
    landing: document.getElementById('landing'),
    logoPath: document.querySelector('#landing .icon path'),
    menu: document.querySelector('header nav')

  }

  const raiseLabel = e => {
    e.target.parentNode.classList.add('active');
  }

  const lowerLabel = e => {
    if (e.target.value === '') {
      e.target.parentNode.classList.remove('active');
    }
  }

  const toggleToggle = e => {
    e.target.classList.toggle('active');
  }

  const loadHomePage = () => {
    setTimeout(() => {
      globalEls.landing.classList.add('loaded');
      globalEls.menu.classList.add('expand');
  },200)
  }

  const init = () => {
    globalEls.inputs.forEach(el => {
      el.addEventListener('focus', raiseLabel);
      el.addEventListener('blur', lowerLabel);
    });

    globalEls.logoPath.addEventListener('animationend', loadHomePage)

    globalEls.toggles.forEach(el => el.addEventListener('click', toggleToggle));
  }

  init();
}