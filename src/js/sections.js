{
  const scrolled = e => {
    window.scrollTo( 0, 0 );

    if (!sectionController.scrolling) {
      if (e.deltaY < 0 && sectionController.currentSectionIndex > 0) { // up
        sectionController.currentSectionIndex = Math.max(sectionController.currentSectionIndex - 1, 0);
        showSection(-1);
      } else if (e.deltaY > 0 && sectionController.currentSectionIndex < sectionController.maxSections) { //down
        sectionController.currentSectionIndex = Math.min(sectionController.currentSectionIndex + 1, sectionController.maxSections);
        showSection(1);
      }
    }
  };

  const showSection = direction => {
    sectionController.scrolling = true;
    const dirClass = direction > 0 ? 'from-bottom' : 'from-top';

    sectionController.sections.forEach(el => el.removeDirection());
    sectionController.getCurrentSection().addClass([dirClass, 'active']);
    addCurrentSectionClass();
  };

  const removeMenuClasses = () => {
    sectionEls.menu.classList.remove(...sectionController.sectionIds);
  };

  const addCurrentSectionClass = () => {
    removeMenuClasses();
    sectionEls.menu.classList.add(sectionController.getCurrentSection().getId());
  };

  function  menuSection(e) {

    // get section index both menuLi 0 & 1 should go to section 0
    const targetSection = Math.max([...sectionEls.menuLis].findIndex(el => el === this) - 1, 0);
    
    if (targetSection < sectionController.currentSectionIndex) {
      sectionController.currentSectionIndex = targetSection;
      showSection(-1);
    } else if (targetSection > sectionController.currentSectionIndex) {
      sectionController.currentSectionIndex = targetSection;
      showSection(1);
    }

    addCurrentSectionClass();
  };

  const init = () => {
    window.addEventListener('wheel', scrolled);
    sectionEls.menuLis.forEach(el => el.addEventListener('click', menuSection))
  };

  class Section {
    constructor(el, i) {
      this.el = el;
      this.id = el.id;
      this.index = i;
    }

    getId() {
      return this.id;
    }

    afterScrolled(e) {
      if (e.animationName === 'from-bottom' || e.animationName === 'from-top') {
        sectionController.sections.forEach(el => el.el.classList.remove('active'));
        this.el.classList.add('active');
        sectionController.scrolling = false;
      }
    }

    removeDirection() {
      this.el.classList.remove('from-bottom', 'from-top');
    }

    addClass(classes) {
      this.el.classList.add(...classes);
    }
  };

  const sectionEls = {
    sections: document.querySelectorAll('section.page-section'),
    menuLis: document.querySelectorAll('nav#main-menu li'),
    menu: document.getElementById('main-menu'),
  };

  let sectionController = {
    currentSectionIndex: 0,
    sections: [...sectionEls.sections].map( (el, i) => new Section(el, i)),
    maxSections: sectionEls.sections.length - 1,
    scrolling: false,
  };
  
  sectionController.sectionIds = sectionController.sections.map(el => el.id);
  sectionController.getCurrentSection = () => sectionController.sections[sectionController.currentSectionIndex];

  init();
}


