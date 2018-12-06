
  
  // Declare global variables
  let keys = {37: 1, 38: 1, 39: 1, 40: 1};
  
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
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal .content');
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
    
    switch(state){
      case 'open':
      openModal();
      break;
      
      case 'close':
      closeModal();
      break;
      
      case 'toggle':
      default:
      if(modal.classList.contains('open')){
        closeModal();
      }else{
        openModal();
      }
    }
  };

  const getStartedBtns = document.querySelectorAll('.get-started'); 
  getStartedBtns.forEach(btn => {
    console.log('added eventlistenser');
    btn.addEventListener('click', toggleModal('open'));
  });
  
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
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }
  
  function enableScroll() {
    if (window.removeEventListener)
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
  }
  

