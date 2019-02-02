//Page elements used for functions
const pageEls = {
  project: document.querySelector('#projects'),
  bgImage: document.querySelectorAll('#projects .bg-image li'),
  projectNumber: document.querySelector('#projects #project-number'),
  projectTitle: document.querySelector('#projects #project-title'),
  desc: document.querySelector('#projects .content p'),
  websiteBtn: document.querySelector('#projects .content .button'),
  logo: document.querySelector('#projects .logo img'),
  


  imageSlider: document.querySelector('#projects ul.image-slider'),
  imageSlides: document.querySelectorAll('#projects ul.image-slider li'),
  previewImageContainer: document.querySelector('#projects ul.preview-container'),
  previewImages: document.querySelectorAll('#projects .preview-image'),
  magnifier: document.querySelector('#projects li.magnifier'),
  progressBar: document.querySelector('#projects aside .bar')
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
  galleryActive: null
}

// return li index that is being targeted
const findLiIndex = target => {
  return [...pageEls.previewImageContainer.children].findIndex(li => target == li)
}

// move the magnifier div over the correct preview image
const galleryPreviewHover = e => {
  const i = findLiIndex(e.target.parentNode);
  pageEls.magnifier.style.left = i * 25 + '%';
}

const changeGalleryImage = e => {
  const targetIndex = findLiIndex(e.target.parentNode) + 1;//newActive +1 because first image is the non project image
  const targetLi = pageEls.imageSlides[targetIndex]; // slide 
  let slideClass = null
  
  if (projectController.galleryActive === targetIndex) return false;

  targetLi.classList.remove('in-left', 'in-right'); // remove animation classes
  pageEls.imageSlides.forEach(el => el.style.zIndex = 1); // reset all z-indexes
  pageEls.imageSlides[projectController.galleryActive].style.zIndex = 2;
  pageEls.imageSlides[targetIndex + 1].style.zIndex = 3;

  if (targetIndex > projectController.galleryActive || projectController.galleryActive === null) {
      slideClass = 'in-left';
  } else if ( targetIndex < projectController.galleryActive) {
      slideClass = 'in-right';
  }

  setTimeout(() => {
      pageEls.imageSlides[targetIndex + 1].classList.add(slideClass);
  }, 1)
  projectController.galleryActive = targetIndex;
}

[...pageEls.previewImageContainer.children].forEach(el => {
  el.addEventListener('mouseover', galleryPreviewHover);
  el.addEventListener('click', changeGalleryImage)
})

const setBgImg = (el, img) => {
  el.style.background = `url('${projectController.imagePrefix}${img}') no-repeat 0% center / cover`;
}

const loadProject = project => {
  pageEls.project.classList.remove('loaded');

  setTimeout(() => {
    const newBg = document.querySelector('#projects .bg-image li:not(.active)')
    setBgImg(newBg, project.mainImg);
    pageEls.bgImage.forEach(el => el.classList.toggle('active'));
    
    pageEls.projectNumber.textContent = `0${projectController.projectActive + 1}`;
    pageEls.projectTitle.textContent = project.title;
    pageEls.desc.textContent = project.desc,
    pageEls.websiteBtn.href = project.url

    pageEls.logo.src = projectController.imagePrefix + project.logo;
    setBgImg(pageEls.imageSlides[0], project.mainImg);

    pageEls.imageSlides.forEach(el => {
        el.classList.remove('in-left', 'in-right');
        el.style.zIndex = 1
    });
    pageEls.imageSlides[0].style.zIndex = 3;

    project.images.forEach((el, i) => {
        setBgImg(pageEls.imageSlides[i + 1], el);
        setBgImg(pageEls.previewImages[i], el);
    });

    pageEls.progressBar.style.width = (projects.length - 1 - projectController.projectActive) * (100 / projects.length) + '%';

    document.body.classList.remove(...projectController.projectClasses);
    document.body.classList.add(project.class);
    pageEls.project.classList.add('loaded');
  }, 1000);
}

const nextProject = () => {
  console.log('done')
  projectController.projectActive++
  projectController.projectActive = Math.min(projectController.projectActive, projects.length - 1)
  loadProject(projects[projectController.projectActive]);
}

const prevProject = () => {
  projectController.projectActive--
  projectController.projectActive = Math.max(projectController.projectActive, 0)
  loadProject(projects[projectController.projectActive]);
}

const reset = e => {
  
}

document.querySelector('ul.arrows li.next').addEventListener('click', nextProject);
document.querySelector('ul.arrows li.prev').addEventListener('click', prevProject);
pageEls.projectNumber.addEventListener('transitionend', reset);

setTimeout(() => {
  pageEls.project.classList.add('loaded');
}, 400)

