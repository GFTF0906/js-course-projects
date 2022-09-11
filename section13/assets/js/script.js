'use strict';

//* Modal window
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//* Page navigation
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', e => {
//     e.preventDefault();

//     const id = el.getAttribute('href');
//     const selectedEl = document.querySelector(id);

//     selectedEl.scrollIntoView({ behavior: 'smooth' });

//   });
// });


//? Event Delegation
//* 1. Add event listener to common parent element
//* 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  //? Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const selectedEl = document.querySelector(e.target.getAttribute('href'));
    selectedEl.scrollIntoView({ behavior: 'smooth' });
  }

});


//* Scrolling
btnScrollTo.addEventListener('click', e => {

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' });

});


//* Tabbed Component
tabsContainer.addEventListener('click', e => {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');

  //? Active Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked?.classList.add('operations__tab--active');

  //? Active content area
  const contentId = clicked?.getAttribute('data-tab');

  tabsContent.forEach(content => {

    if (content.classList.contains(`operations__content--${contentId}`)) {
      tabsContent.forEach(c => c.classList.remove('operations__content--active'));
      content?.classList.add('operations__content--active');
    }

  });

});


//* Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => { if (s !== link) s.style.opacity = this; })
    logo.style.opacity = this;
  }
};

//? Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


//* Sticky Navigation
// window.addEventListener('scroll', () => {
//   const initialCoords = section1.getBoundingClientRect();

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

// });

// const obsCallback = (entries, observer) => {
//   entries.forEach(entry => console.log(entry))
// };

// const obsOptions = {
//   root: null,
//   threshold: [0.1, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  if (!entries[0].isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);


//* Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  if (!entries[0].isIntersecting) return;

  entries[0].target.classList.remove('section--hidden');
  observer.unobserve(entries[0].target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});


//* Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  if (!entries[0].isIntersecting) return;

  //? Replace src with data-src
  entries[0].target.src = entries[0].target.dataset.src;

  entries[0].target.addEventListener('load', () => {
    entries[0].target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));


//* Slider Component

const slider = () => {

  const slides = document.querySelectorAll('.slide');
  const dotContainer = document.querySelector('.dots');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  //? Functions
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    });
  }

  const activateDot = slide => {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');

      document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');

    });
  }

  const goToSlide = slide => slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const previousSlide = () => {
    if (curSlide === 0) curSlide = maxSlide -1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  }

  init();

  //? Events Handlers
  btnLeft.addEventListener('click', previousSlide);
  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', e => {
    e.key === 'ArrowLeft' && previousSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDot(slide);
    }
  });

}
slider();


//////////////////////////////////////////////////////


// //* Creating cookie-message div
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Close</button>';

// header.append(message);

// //* Deleting cookie-message div
// document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove());

// //* Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '107.3%';
// message.style.padding = '8px';

// //* Attributes
// const logo = document.querySelector('.nav__logo');
// logo.setAttribute('company', 'Bankist');

// console.log(logo.className);

// //! Non-standard
// console.log(logo.getAttribute('company'));

// //* Classes
// //? logo.classList.add();
// //? logo.classList.remove();
// //? logo.classList.toggle();
// //? logo.classList.contains();


// //* DOM Traversing
// const h1 = document.querySelector('h1');

// //? Going downwards: child
// console.log(h1.querySelector('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = '#467';
// h1.lastElementChild.style.color = '#764';

// //? Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--color-primary-opacity)';

// //? Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);