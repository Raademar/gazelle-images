const modal = document.querySelector('.modal');
const modalContent            = document.querySelector('.modal .content');
const modalBackground         = document.querySelector('.modal .background');
const getStartedBtns          = document.querySelectorAll('.get-started');
let   keys                    = {37: 1, 38: 1, 39: 1, 40: 1};                  // Keys to disable scroll
const body                    = document.body;
let   currentScrollPosFromTop = document.documentElement.scrollTop;
const prog_langs = document.querySelectorAll('.swiper-header ul li');

  // Swiper init
  const swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
    },
  });

  
  prog_langs.forEach((element, index) => {
    element.addEventListener('click', () => {
      swiper.slideTo(index, 400);
    });

    const setActiveClass = () => {
      if(swiper.activeIndex === index){
        element.classList.add('active');
      }else{
        element.classList.remove('active');
      }
      console.log('shit')
    }

    swiper.on('slideChange', () => setActiveClass());

    setTimeout(() => {
      console.log('added active class');
      if(index === 0){
        element.classList.add('active');
      }
    }, 200);

  });
  
/**
* toggleModal
* @param {string} state Sets the state of the modal, etc: open, close, toggle
*/
const toggleModal = (state) => {
  const modal           = document.querySelector('.modal');
  const modalBackground = document.querySelector('.modal .background');
  
  const openModal = () => {
    modal.classList.add('open');
    modalBackground.addEventListener('click', () => {
      closeModal();
    });
    disableScroll();
  }
  
  const closeModal = () => {
    modal.classList.remove('open');
    // modalBackground.removeEventListener('click');
    enableScroll();
  }
  
  if(state === 'open'){
    openModal();
  }else if(state === 'close'){
    closeModal();
  }else{
    if(modal.classList.contains('open')){
      closeModal();
    }else{
      openModal();
    }
  }
};

getStartedBtns.forEach(btn => btn.addEventListener('click', () => {toggleModal('open')}));

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Disable/Enable scroll functions
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
  e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function disableScroll() {
  if (window.addEventListener) // older FF
  window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel      = preventDefault;                          // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault;  // older browsers, IE
  window.ontouchmove  = preventDefault;                          // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
  if (window.removeEventListener)
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel      = null;
  window.ontouchmove  = null;
  document.onkeydown  = null;
}

const documentationResult = document.querySelector('.documentation-result');
const searchDocs = document.querySelector('#search-docs');
let timeout = null;

const makeFirstLetterUppercase = (string) => {
  if (searchDocs.value === '') {
    while(documentationResult.childElementCount > 1) {
      documentationResult.removeChild(documentationResult.lastChild);
    }
    return;
  }
  string = string.toLowerCase();
  let arr = string.split('');
  arr[0] = arr[0].toUpperCase();
  string = arr.join('');
  return string;
};

const renderSearchResult = (searchQuery) => {
  const a = document.createElement('a');
  a.href = '#documentation-result';
  a.textContent = searchQuery
  documentationResult.appendChild(a);
};

searchDocs.onkeyup = function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    renderSearchResult(makeFirstLetterUppercase(searchDocs.value));
  }, 800);
};