
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
      this.activeSection = this.sections[this.activeSectionIndex];

      this.globalEls = globalEls;
      this.scrolling = false;
      this.deviceType = this.helpers.getDeviceType();

      this.resizeTimeout = false;
      this.resizeDelay = 250;

      this.scrollY = window.scrollY;

      this.initEventListeners();
    }

    initEventListeners() {
      window.addEventListener('resize', this.debounceResize.bind(this) );
      window.addEventListener('scroll', this.wheelScrolled.bind(this));
      window.addEventListener('wheel', this.wheelScrolled.bind(this));

      this.globalEls.logoPath.addEventListener('animationend', this.loadHomePage.bind(this));
      this.sections.forEach(el => el.el.addEventListener('animationend', this.endSectionScrolling.bind(this)));
      this.globalEls.menuLis.forEach(el => el.addEventListener('click', this.menuSection.bind(this)));
    }

    debounceResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.windowResize.bind(this), this.resizeDelay);
    }

    windowResize() {
      const prevDevice = this.deviceType;
      this.deviceType = this.helpers.getDeviceType();

      if (prevDevice !== this.deviceType) {
        if (this.deviceType === 'desktop') {
          window.scrollTo(0, 0);
        } else if (this.deviceType === 'mobile') {
          window.scrollTo(0, this.activeSection.el.getBoundingClientRect().top)
        }
      }
    }

    wheelScrolled(e) {
      if (this.deviceType === 'mobile') {
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
      this.scrollY = window.scrollY;
    }

    mobileScroll() {
      const dir = this.scrollY < window.scrollY ? 'down' : 'up';
      
      if (
        dir === 'down' && 
        this.activeSectionIndex < this.sections.length - 1 &&
        this.activeSection.el.getBoundingClientRect().top < (document.documentElement.clientHeight / 2) * -1
      ) {
          this.activeSectionIndex++;
          this.activeSection = this.sections[this.activeSectionIndex];
          this.changeSectionClasses();
        }
      else if (
        dir == 'up' &&
        this.activeSectionIndex > 0 &&
        this.activeSection.el.getBoundingClientRect().top > document.documentElement.clientHeight / 2
      ) {
        this.activeSectionIndex--;
        this.activeSection = this.sections[this.activeSectionIndex];
        this.changeSectionClasses();
      }
    }

    loadHomePage() {
      this.activeSection.el.classList.add('loaded');
      // this.globalEls.menu.classList.add('expand');
    }

    startSectionScrolling(direction) {
      const dirClass = direction > 0 ? 'from-bottom' : 'from-top';

      this.scrolling = true;
      this.activeSection = this.sections[this.activeSectionIndex];

      this.activeSection.el.classList.add(dirClass);
    }

    endSectionScrolling(e) {
      if (e.animationName === 'from-bottom' || e.animationName === 'from-top') {
        this.changeSectionClasses();
        this.scrolling = false;
      }
    }

    changeSectionClasses() {
      this.sections.forEach(section => section.el.classList.remove('active')); 
      if (this.activeSectionIndex === 1)  {
        this.helpers.swapBodyClass(this.projectCtrl.projectData[this.projectCtrl.activeProjectIndex].class);
      } else {
        this.helpers.swapBodyClass(this.activeSection.getId());
      }
      this.activeSection.el.classList.add('active', 'loaded');
      this.activeSection.el.classList.remove('from-bottom', 'from-top');
    }

    menuSection(e) {
    // get section index both menuLi 0 & 1 should go to section 0
    // const clickedSquare = this.helpers.findLiIndex(this.globalEls.menuLis, e.target);
    // const targetSection = Math.max(clickedSquare - 1, 0);
    
    
    // if (targetSection < this.activeSectionIndex) {
    //   this.activeSectionIndex = targetSection;
    //   this.startSectionScrolling(-1);
    // } else if (targetSection > this.activeSectionIndex) {
    //   this.activeSectionIndex = targetSection;
    //   this.startSectionScrolling(1);
    // }

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

  class Section {
    constructor(el, i) {
      this.el = el;
      this.index = i;
      this.top = false;
      this.height = false;
    }

    getId() {
      return this.el.id;
    }

    removeDirections() {
      this.el.classList.remove('from-bottom', 'from-top');
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

    getDeviceType() {
      const windowW = document.documentElement.clientWidth;
      if (windowW < 768) {
        return 'mobile';
      }
      return 'desktop';
    }
  }



  const bodyClasses = [...projectData.map(el => el.class), 'landing', 'map'];
  const helpers = new Helpers(bodyClasses);
  const sections = [...document.querySelectorAll('section.page-section')].map((el, i) => new Section(el, i));
  const projectController = new Projects(projectEls, projectData, helpers);
  const mainController = new Controller(projectController, helpers, sections, globalEls);

}

