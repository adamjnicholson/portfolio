//HELPER FUNCTIONS

// set background image of element
const setBgImg = (el, img) => {
  el.style.backgroundImage = `url('${projectController.imagePrefix}${img}')`;
}

// return li index that is being targeted
const findLiIndex = target => {
  return [...pageEls.previewImages].findIndex(li => target == li)
}

//IMAGE GALLERY FUNCTIONS

// move the magnifier div over the correct preview image
const galleryPreviewHover = e => {
  const i = findLiIndex(e.target);
  console.log(i)
  pageEls.magnifier.style.left = i * 25 + '%';
}

const changeGalleryImage = e => {
  const targetIndex = findLiIndex(e.target);
  if (projectController.galleryImageActive === targetIndex) return;

  const unActive = pageEls.galleryImages[[...pageEls.galleryImages].findIndex(el => !el.classList.contains('active'))];
  const direction = projectController.galleryImageActive < targetIndex ? 'in-left' : 'in-right';
  
  unActive.style.zIndex = 2;
  unActive.style.backgroundImage = e.target.style.backgroundImage;
  unActive.classList.add(direction);

  projectController.galleryImageActive = targetIndex;
}

const changeGalleryActive = () => {
  pageEls.galleryImages.forEach(el => {
    el.classList.toggle('active');
    el.classList.remove('in-left', 'in-right');
    el.style.zIndex = '';
  }); 
}

//PROJECT FUNCTIONS

const loadProject = project => {
  projectController.galleryImageActive = -1;

  pageEls.project.classList.remove('loaded');

  // wait for all animations to complete
  setTimeout(() => {

    //swap background images
    const newBg = pageEls.bgImage[[...pageEls.bgImage].findIndex(el => !el.classList.contains('active'))];
    setBgImg(newBg, project.mainImg);
    pageEls.bgImage.forEach(el => el.classList.toggle('active'));
    
    // swap all content
    pageEls.projectNumber.textContent = `0${projectController.projectActive + 1}`;
    pageEls.projectTitle.textContent = project.title;
    pageEls.desc.textContent = project.desc,
    pageEls.websiteBtn.href = project.url
    pageEls.logo.src = projectController.imagePrefix + project.logo;

    // Set gallery image to main image, remove the other
    pageEls.galleryImages.forEach (el => {
      if (el.classList.contains('active')) {
        setBgImg(el, project.mainImg);
      } else {
        el.style.backgroundImage = '';
      }
    })

    // Set preivew images
    pageEls.previewImages.forEach((el, i) => {
      setBgImg(el, project.images[i])
    });

    pageEls.progressBar.style.width = (projects.length - 1 - projectController.projectActive) * (100 / projects.length) + '%';

    changeButtonStates();

    document.body.classList.remove(...projectController.projectClasses);
    document.body.classList.add(project.class);
    pageEls.menu.classList.remove(...projectController.projectClasses);
    console.log()
    pageEls.menu.classList.add(project.class);
    pageEls.project.classList.add('loaded');
  }, 1000);
}

const changeButtonStates = () => {
  if (projectController.projectActive === projects.length - 1) {
    pageEls.nextBtn.classList.add('disabled');
  } else {
    pageEls.nextBtn.classList.remove('disabled');
  }

  if (projectController.projectActive === 0) {
    pageEls.prevBtn.classList.add('disabled');
  } else {
    pageEls.prevBtn.classList.remove('disabled');
  }
}

const nextProject = () => {
  if (projectController.projectActive < projects.length - 1) {
    projectController.projectActive++;
    loadProject(projects[projectController.projectActive]);
  }
}

const prevProject = () => {
  if (projectController.projectActive > 0) {
    projectController.projectActive--
    loadProject(projects[projectController.projectActive]);
  }
}

const init = () => {

  //Event Listeners
  document.querySelector('ul.arrows li.next').addEventListener('click', nextProject);
  document.querySelector('ul.arrows li.prev').addEventListener('click', prevProject);

 pageEls.previewImages.forEach(el => {
    el.addEventListener('mouseover', galleryPreviewHover);
    el.addEventListener('click', changeGalleryImage)
  });

  pageEls.galleryImages.forEach(el => el.addEventListener('animationend', changeGalleryActive));

  // setTimeout(() => {
  //   pageEls.project.classList.add('loaded');
  // }, 400);
}



//Page elements used for functions
const pageEls = {
  project: document.querySelector('#projects'),
  bgImage: document.querySelectorAll('#projects .bg-image li'),
  projectNumber: document.querySelector('#projects #project-number'),
  projectTitle: document.querySelector('#projects #project-title'),
  desc: document.querySelector('#projects .content p'),
  websiteBtn: document.querySelector('#projects .content .button'),
  logo: document.querySelector('#projects .logo img'),
  galleryImages: document.querySelectorAll('#projects .gallery-image'),
  previewImageContainer: document.querySelector('#projects ul.preview-container'),
  previewImages: document.querySelectorAll('#projects .preview-image'),
  magnifier: document.querySelector('#projects li.magnifier'),
  nextBtn: document.querySelector('#project-nav .next'),
  prevBtn: document.querySelector('#project-nav .prev'),
  progressBar: document.querySelector('#projects aside .bar'),
  menu: document.getElementById('main-menu');
}

// Infomation about each project
const projects = [
  {
    class: 'natureworks',
    title: 'NatureWorks',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum massa quis mollis varius. Vivamus pellentesque odio at vestibulum luctus. Quisque congue ex felis, semper fringilla tortor euismod in. Donec vitae fringilla est. Suspendisse enim urna, tristique ullamcorper luctus quis, auctor at leo. In sodales, erat non rhoncus tincidunt, nibh urna blandit nunc, vel gravida libero dolor quis augue. Mauris malesuada accumsan neque, a tincidunt velit fermentum sed. Fusce nunc risus, commodo eget tortor ac, sollicitudin varius nisl. Aliquam erat volutpat. Suspendisse tellus erat, scelerisque dapibus ex a, euismod cursus nibh. Duis ultricies eros in velit malesuada, nec porttitor eros ultricies. Morbi mollis pellentesque tellus, vitae posuere lectus faucibus ut.',
    url: 'www.google.com',
    logo: 'natureworks-logo.png',
    mainImg: 'forest-edited.jpg',
    images: ['preview-1.jpg', 'preview-2.jpg', 'preview-3.jpg', 'preview-4.jpg']
  },
  {
    class: 'anboc',
    title: 'Anboc',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum massa quis mollis varius. Vivamus pellentesque odio at vestibulum luctus. Quisque congue ex felis, semper fringilla tortor euismod in. Donec vitae fringilla est. Suspendisse enim urna, tristique ullamcorper luctus quis, auctor at leo. In sodales, erat non rhoncus tincidunt, nibh urna blandit nunc, vel gravida libero dolor quis augue. Mauris malesuada accumsan neque, a tincidunt velit fermentum sed. Fusce nunc risus, commodo eget tortor ac, sollicitudin varius nisl. Aliquam erat volutpat. Suspendisse tellus erat, scelerisque dapibus ex a, euismod cursus nibh. Duis ultricies eros in velit malesuada, nec porttitor eros ultricies. Morbi mollis pellentesque tellus, vitae posuere lectus faucibus ut.',
    url: 'www.google.com.au',
    logo: 'anboc-logo.png',
    mainImg: 'anboc.jpg',
    images: ['anboc-1.jpg', 'anboc-2.jpg', 'anboc-3.jpg', 'anboc-4.jpg']
  } ,
  {
    class: 'buywood',
    title:'Buywood Commerical',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum massa quis mollis varius. Vivamus pellentesque odio at vestibulum luctus. Quisque congue ex felis, semper fringilla tortor euismod in. Donec vitae fringilla est. Suspendisse enim urna, tristique ullamcorper luctus quis, auctor at leo. In sodales, erat non rhoncus tincidunt, nibh urna blandit nunc, vel gravida libero dolor quis augue. Mauris malesuada accumsan neque, a tincidunt velit fermentum sed. Fusce nunc risus, commodo eget tortor ac, sollicitudin varius nisl. Aliquam erat volutpat. Suspendisse tellus erat, scelerisque dapibus ex a, euismod cursus nibh. Duis ultricies eros in velit malesuada, nec porttitor eros ultricies. Morbi mollis pellentesque tellus, vitae posuere lectus faucibus ut.',
    url: 'www.google.com',
    logo: 'natureworks-logo.png',
    mainImg: 'forest-edited.jpg',
    images: ['preview-1.jpg', 'preview-2.jpg', 'preview-3.jpg', 'preview-4.jpg']
  }
];

// Holds infomation about the states of transitions
const projectController = {
  projectActive: 0,
  projectClasses: projects.map(el => el.class),
  imagePrefix: '//localhost:3000/and/wp-content/themes/and/dist/images/',
  galleryImageActive: -1
};



init();

setTimeout( () => {
  document.getElementById('projects').classList.add('loaded');
}, 400)



