{
  const globalEls = {
    inputs: document.querySelectorAll('.input-container *:last-child'),
    toggles: document.querySelectorAll('.toggle')
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

  const init = () => {
    globalEls.inputs.forEach(el => {
      el.addEventListener('focus', raiseLabel);
      el.addEventListener('blur', lowerLabel);
    });

    globalEls.toggles.forEach(el => el.addEventListener('click', toggleToggle));
  }

  init();
}