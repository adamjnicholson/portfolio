
{
  const projectData = projects;
  const projectEls = {
    projectContainer: document.getElementById('projects'),
    bgImage: document.querySelectorAll('#projects .bg-image li'),
    projectNumber: document.getElementById('project-number'),
    projectTitle: document.getElementById('project-title'),
    desc: document.getElementById('content-container'),
    logo: document.querySelector('#logo img'),
    galleryImages: document.querySelectorAll('#project-gallery .gallery-image'),
    previewImages: document.querySelectorAll('#preview-container .preview-image'),
    magnifier: document.querySelector('#preview-container  li.magnifier'),
    nextBtn: document.querySelector('#project-nav .next'),
    prevBtn: document.querySelector('#project-nav .prev'),
    curProjectNum: document.getElementById('current'),
    progressBar: document.querySelector('#bar .bar-inner'),
  }

  const globalEls = {
    menu: document.getElementById('main-menu'),
    menuLis: document.querySelectorAll('nav#main-menu li'),
    logoPath: document.querySelector('#landing .icon path'),
  }


  class Controller {
    constructor(projectCtrl, helpers, sections, globalEls) {
      this.projectCtrl = projectCtrl;
      this.helpers = helpers;

      this.sections = sections;
      this.activeSectionIndex = 0;
      this.activeSection = 0;

      this.globalEls = globalEls;
      this.scrolling = false;
      this.isMobile = this.helpers.isMobile();

      this.resizeTimeout = false;
      this.resizeDelay = 250;

      this.scrollY = window.scrollY;
      this.scrollInterval = false;
      this.scrollOffset = 0;

      this.startSwipe = -1;
      this.elapsedTime = -1;
      this.allowedTime = 200;
      this.threshold = 150;
      this.restraint = 100;
      this.startX = -1;
      this.startY = -1;
      this.endY = -1;

      this.setActiveSection();
      this.initEventListeners();
      this.initSection();
    
    }

    initEventListeners() {
      window.addEventListener('resize', this.debounceResize.bind(this) );
      window.addEventListener('scroll', this.wheelScrolled.bind(this));
      window.addEventListener('wheel', this.wheelScrolled.bind(this));
      window.addEventListener('touchstart', this.touchStart.bind(this));
      window.addEventListener('touchend', this.touchEnd.bind(this));


      this.globalEls.logoPath.addEventListener('animationend', this.loadHomePage.bind(this));
      this.globalEls.menuLis.forEach(el => el.addEventListener('click', this.goToSection.bind(this)));
      this.globalEls.menuLis[0].addEventListener('click', this.toggleMenu.bind(this));

      this.sections.forEach(el => el.addEventListener('animationend', this.endSectionScrolling.bind(this)));
    }

    debounceResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.windowResize.bind(this), this.resizeDelay);
    }

    windowResize() {
      const prevState = this.isMobile;
      this.isMobile = this.helpers.isMobile();

      if (prevState !== this.isMobile) {
        if (this.isMobile) {
          window.scrollTo(0, this.activeSection.getBoundingClientRect().top);
          this.globalEls.menu.classList.remove('expand');
        } else {
          window.scrollTo(0, 0);
          this.globalEls.menu.classList.add('expand');
        }
      }
    }

    touchStart(e) {
      const touch = e.changedTouches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.startSwipe = new Date();
    }

    touchEnd(e) {
      const touch = e.changedTouches[0];
      const distX = touch.clientX - this.startX;
      const distY = touch.clientY - this.startY;
      this.elapsedTime = new Date() - this.startSwipe;

      if (this.elapsedTime <= this.allowedTime) {
        if (Math.abs(distY) >= this.threshold && Math.abs(distX) <= this.restraint){
          if (distY < 0) {
            this.activeSectionIndex++;
            this.startSectionScrolling(1);
          } else {
            this.activeSectionIndex--;
            this.startSectionScrolling(-1);
          }
        }
      }
    }
    
    wheelScrolled(e) {
      if (this.isMobile) {
        this.mobileScroll();
      } else {
        if (this.scrolling) return;
        window.scrollTo( 0, 0 );
        if (e.deltaY < 0 && this.activeSectionIndex > 0) { // up
          this.activeSectionIndex--;
          this.startSectionScrolling(-1);
        } else if (e.deltaY > 0 && this.activeSectionIndex < this.sections.length - 1) { //down
          this.activeSectionIndex++;
          this.startSectionScrolling(1);
        }
      }
    }

    mobileScroll() {
      const dir = this.scrollY < window.scrollY ? 'down' : 'up';
      this.scrollY = window.scrollY;
      if (
        dir === 'down' && 
        this.activeSectionIndex < this.sections.length - 1 &&
        !this.sectionInViewport(this.activeSection)
      ) {
          this.activeSectionIndex++;
          this.setActiveSection();
          this.changeSectionClasses();
        }
      else if (
        dir == 'up' &&
        this.activeSectionIndex > 0 &&
        this.activeSection.getBoundingClientRect().top > document.documentElement.clientHeight / 2
      ) {
        this.activeSectionIndex--;
        this.setActiveSection();
        this.changeSectionClasses();
      }
    }

    sectionInViewport(section) {
      const box = section.getBoundingClientRect();
      return box.bottom > 0 && box.bottom > document.documentElement.clientHeight / 2;
    }

    startSectionScrolling(direction) {
      const dirClass = direction > 0 ? 'from-bottom' : 'from-top';

      this.scrolling = true;
      this.setActiveSection();

      this.activeSection.classList.add(dirClass);
      this.activeSection.style.zIndex = 2;
    }

    endSectionScrolling(e) {
      if (e.animationName === 'from-bottom' || e.animationName === 'from-top') {
        this.changeSectionClasses();
        this.scrolling = false;
      }
    }

    scrollTo(element, to, duration, ctrl) {
      if (duration < 0) return;
      var difference = to - element.scrollTop;
      var perTick = difference / duration * 10;
      setTimeout(() => {
        if (perTick > 0 || perTick < 0) {
          element.scrollTop += perTick;
          ctrl.scrollTo(element, to, duration - 10, ctrl);
        }
      }, 10);
    }

    initSection() {
      const vh = document.documentElement.clientHeight;

      this.activeSectionIndex = [...this.sections].findIndex(this.sectionInViewport);
      this.setActiveSection();
      this.changeSectionClasses();

      if (!this.isMobile) {
        this.globalEls.menu.classList.add('expand');
      }
    }

    setActiveSection() {
      this.activeSection = this.sections[this.activeSectionIndex];
    }

    changeSectionClasses() {
      this.sections.forEach(section => section.classList.remove('active')); 
      if (this.activeSectionIndex === 1)  {
        this.helpers.swapBodyClass(this.projectCtrl.projectData[this.projectCtrl.activeProjectIndex].class);
        this.activeSection.classList.add('show-nav');
      } else {
        this.helpers.swapBodyClass(this.activeSection.id);
      }
      this.activeSection.classList.add('active', 'loaded');
      this.activeSection.classList.remove('from-bottom', 'from-top');
      this.activeSection.style.zIndex = 1;
    }

    goToSection(e) {
      // get section index both menuLi 0 & 1 should go to section 0
      const clickedSquare = this.helpers.findLiIndex(this.globalEls.menuLis, e.target);
      const targetSection = Math.max(clickedSquare - 1, 0);

      if (this.isMobile) {
        if (clickedSquare !== 0) {
          this.scrollTo(document.documentElement, this.sections[targetSection].offsetTop, 1000, this);   
        }
      } else {
        
        if (targetSection < this.activeSectionIndex) {
          this.activeSectionIndex = targetSection;
          this.startSectionScrolling(-1);
        } else if (targetSection > this.activeSectionIndex) {
          this.activeSectionIndex = targetSection;
          this.startSectionScrolling(1);
        }
      }
    }    

    toggleMenu() {
      if (this.isMobile) {
        this.globalEls.menu.classList.toggle('expand');
      }
    }

    loadHomePage(e) {
      this.activeSection.classList.add('show-content');
    }
  }

  class Projects {
    constructor(projectEls, projectData, helpers) {
      this.helpers = helpers;
      this.projectData = projectData;
      this.els = projectEls;
      this.projectClasses = this.projectData.map(el => el.class);
      this.activeProjectIndex = 0;
      this.galleryImageActive = -1;

      this.initEventListeners();
    }

    initEventListeners() {
      this.els.nextBtn.addEventListener('click', this.loadProject.bind(this, 1));
      this.els.prevBtn.addEventListener('click', this.loadProject.bind(this, -1));

      this.els.previewImages.forEach(el => {
        el.addEventListener('mouseover', this.galleryPreviewHover.bind(this));
        el.addEventListener('click', this.changeGalleryImage.bind(this));
      });

      this.els.galleryImages.forEach(el => el.addEventListener('animationend', this.changeGalleryActive.bind(this)));
    }

    disabledBtns() {
      this.els.prevBtn.classList.remove('disabled');
      this.els.nextBtn.classList.remove('disabled');

      if (this.activeProjectIndex === 0) {
        this.els.prevBtn.classList.add('disabled');
      }

      if (this.activeProjectIndex === this.projectData.length - 1) {
        this.els.nextBtn.classList.add('disabled');
      }
    }

    loadProject(direction, e) {
      if (!e.target.classList.contains('disabled')) {
        this.setActiveProjectIndex(direction);
        this.disabledBtns();
        this.els.projectContainer.classList.remove('loaded');
        this.changeContent(this.projectData[this.activeProjectIndex]);
      }
    }

    setActiveProjectIndex(direction) {      
      this.activeProjectIndex += direction;
      if (this.activeProjectIndex < 0) {
        this.activeProjectIndex = 0;
      }

      if (this.activeProjectIndex > this.projectData.length - 1) {
        this.activeProjectIndex = this.projectData.length - 1;
      }
    }

    changeContent(project) {
      const btn = [...this.els.desc.childNodes].find(el => el.tagName === 'A');
      btn.href = project.url;

      setTimeout(() => {
        this.helpers.swapBgImg(this.els.bgImage, project.mainImg);
        this.els.projectNumber.textContent = `0${this.activeProjectIndex + 1}`;
        this.els.projectTitle.textContent = project.title;
        this.els.desc.innerHTML = project.desc;
        this.els.desc.appendChild(btn);
        this.els.logo.src = project.logo;

        this.els.galleryImages.forEach (el => {
          if (el.classList.contains('active')) {
            this.helpers.setBgImg(el, project.mainImg);
          } else {
            el.style.backgroundImage = '';
          }
        });

        this.els.previewImages.forEach((el, i) => {
          this.helpers.setBgImg(el, project.gallery[i])
        });
        
        this.els.curProjectNum.textContent = `0${this.activeProjectIndex + 1}`;
        this.els.progressBar.style.width = (100 / this.projectData.length) * (this.activeProjectIndex + 1) + '%';

        this.els.projectContainer.classList.remove(...this.projectClasses);
        this.els.projectContainer.classList.add(project.class);

        this.helpers.swapBodyClass(project.class);

        setTimeout(() => {
          this.els.projectContainer.classList.add('loaded');
        }, 100);
      }, 1000);
    }

    galleryPreviewHover(e) {
      const i = this.helpers.findLiIndex(this.els.previewImages, e.target);
      this.els.magnifier.style.left = i * 25 + '%';
    }

    changeGalleryImage(e) {
      const targetIndex = this.helpers.findLiIndex(this.els.previewImages, e.target);
      if (this.galleryImageActive !== targetIndex) {
        const inActive = this.els.galleryImages[[...this.els.galleryImages].findIndex(el => !el.classList.contains('active'))];
        const direction = this.galleryImageActive < targetIndex ? 'in-left' : 'in-right';
        
        inActive.style.zIndex = 2;
        inActive.style.backgroundImage = e.target.style.backgroundImage;
        inActive.classList.add(direction);
      
        this.galleryImageActive = targetIndex;
      }
    }

    changeGalleryActive() {
      this.els.galleryImages.forEach(el => {
        el.classList.toggle('active');
        el.classList.remove('in-left', 'in-right');
        el.style.zIndex = '';
      });
    }
  }

  class Helpers {
    constructor(bodyClasses) {
      this.bodyClasses = bodyClasses;
      this.body = document.getElementsByTagName("body")[0];
    }

    setBgImg(el, img) {
      el.style.backgroundImage = `url('${img}')`;
    }

    swapBgImg(bgImages, img) {
      const newBg = bgImages[[...bgImages].findIndex(el => !el.classList.contains('active'))];
      this.setBgImg(newBg, img);
      bgImages.forEach(el => el.classList.toggle('active'));
    }

    swapBodyClass(curClass) {
      this.body.classList.remove(...this.bodyClasses);
      this.body.classList.add(curClass);
    }

    findLiIndex(group, target) {
      return [...group].findIndex(el => target == el)
    }

    isMobile() {
      return document.documentElement.clientWidth < 1024;
    }
  }

  const bodyClasses = [...projectData.map(el => el.class), 'landing', 'map'];
  const helpers = new Helpers(bodyClasses);
  const sections = document.querySelectorAll('section.page-section');
  const projectController = new Projects(projectEls, projectData, helpers);
  const mainController = new Controller(projectController, helpers, sections, globalEls);

}





