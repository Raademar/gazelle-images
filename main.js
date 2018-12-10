const modal = document.querySelector('.modal');
const modalContent            = document.querySelector('.modal .content');
const modalBackground         = document.querySelector('.modal .background');
const getStartedBtns          = document.querySelectorAll('.get-started');
let   keys                    = {37: 1, 38: 1, 39: 1, 40: 1};                  // Keys to disable scroll
const body                    = document.body
let   currentScrollPosFromTop = document.documentElement.scrollTop
  
// Swiper init
const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
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

const documentation = document.querySelector('.documentation-box');
const searchDocs = document.querySelector('#search-docs');

const makeFirstLetterUppercase = (string) => {
  string = string.toLowerCase()
  let arr = string.split('')
  arr[0] = arr[0].toUpperCase()
  string = arr.join('')
  return string
}

searchDocs.addEventListener('input', (event) => {
  console.log(makeFirstLetterUppercase(event.target.value))
})