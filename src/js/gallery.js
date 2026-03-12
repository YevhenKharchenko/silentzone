import Swiper from 'swiper';
import 'swiper/css/bundle';

const dot = document.querySelector('.gallery-progress-dot');
const line = document.querySelector('.gallery-progress-line');

let isDragging = false;

const gallerySwiper = new Swiper('.gallery-swiper-container', {
  direction: 'horizontal',
  loop: false,
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 24,
  speed: 500,
  grabCursor: true,

  breakpoints: {
    1440: {
      slidesPerView: 'auto',
      centeredSlides: false,
    },
  },

  on: {
    init(swiper) {
      document.querySelector('.gallery-swiper-container').classList.add('show');
    },

    progress(swiper) {
      if (!isDragging) {
        const lineWidth = line.offsetWidth;
        const dotWidth = dot.offsetWidth;

        const maxMove = lineWidth - dotWidth;
        const position = swiper.progress * maxMove;

        dot.style.transform = `translate(${position}px, -50%)`;
      }
    },
  },
});

function updateByPointer(clientX) {
  const rect = line.getBoundingClientRect();
  const dotWidth = dot.offsetWidth;

  let position = clientX - rect.left - dotWidth / 2;

  const maxMove = rect.width - dotWidth;

  position = Math.max(0, Math.min(position, maxMove));

  const progress = position / maxMove;

  dot.style.transform = `translate(${position}px, -50%)`;
  gallerySwiper.setProgress(progress);
}

dot.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  updateByPointer(e.clientX);
});

dot.addEventListener('touchstart', () => {
  isDragging = true;
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

document.addEventListener('touchmove', e => {
  if (!isDragging) return;
  updateByPointer(e.touches[0].clientX);
});

line.addEventListener('click', e => {
  updateByPointer(e.clientX);
});
