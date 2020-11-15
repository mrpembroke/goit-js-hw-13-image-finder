import './css/styles.css';
import { refs } from './js/get-refs.js';
import API from './js/apiService.js'; 
import pictureCarfTpl from './templates/picture-card.hbs';

refs.searchForm.addEventListener('submit', onRenderImages);

let page = 1;
let searchQuery = '';

function onRenderImages(e) {
    e.preventDefault();
    refs.galleryContainer.innerHTML = '';
    searchQuery = refs.searchFormInput.value;

    API.fetchImages(searchQuery, page).then(hits => {
        const markup = pictureCarfTpl(hits);
        refs.galleryContainer.innerHTML = markup;

        loadMoreBtnCreate();
        document.querySelector('.js-load-more').addEventListener('click', loadMoreImages);
        refs.searchForm.reset();
    });
}

function loadMoreBtnCreate() {
  if (!document.querySelector('.js-load-more')) {

    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.classList.add('load-more', 'js-load-more');
    refs.viewContainer.append(loadMoreBtn);
    loadMoreBtn.textContent = 'More pics';
  }
}

function loadMoreImages() {
  page += 1;

  API.fetchImages(searchQuery, page).then(hits => {
      const markup = pictureCarfTpl(hits);
      refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
      
      setTimeout(() => {
          window.scrollBy({
              top: document.documentElement.clientHeight - 100,
              behavior: 'smooth',
            });
        }, 1000);
    });
}