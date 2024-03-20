import Notiflix from 'notiflix';
import searchImages from './search-API';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.btn-load');

window.addEventListener('scroll', handleScroll);
searchForm.addEventListener('submit', evt => onSubmit(evt));

let query;
let page;
let slider;

async function onSubmit(evt) {
  evt.preventDefault();
  const query = searchForm.elements['searchQuery'].value;
  gallery.innerHTML = '';
  let page = 1;
  try {
    const images = await searchImages(query, page);
    if (images.length !== 0) {
      showImages(images);
      // if (slider) {
      //   slider.refresh(); 
      // }
    } else {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.log(error);
  }
  // fetchImage()
  // .then(showImages)
  // .catch(console.log(error))
}

function showImages(images) {
  console.log(images);
  const markup = images
    .map(image => {
      return `<a href="${image.largeImageURL}" class="photo-card">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    <div class="info">
    <p class="info-item"><b>Likes:</b> ${image.likes}</p>
    <p class="info-item"><b>Views:</b> ${image.views}</p>
    <p class="info-item"><b>Comments:</b> ${image.comments}</p>
    <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
    </div>
  </a>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  let slider = new SimpleLightbox('.gallery a', {
    doubleTapZoom: '1.5',
    captionsData: 'data-parent',
    captionDelay: 250,
    widthRatio: 1.5,
  });
}

loadBtn.addEventListener('click', loadMore);

async function loadMore() {
  page += 1;
  try {
    const images = await searchImages(query, page);
    if (images.length !== 0) {
      showImages(images);
    } else {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMore();
  }
}
