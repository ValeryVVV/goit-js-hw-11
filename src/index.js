import { Notify } from 'notiflix';
import NewsImagesApiService from './js/fetchImages';
import { renderGallery } from './js/markup-gallery';
import { LoadMoreBtn } from './js/load-more-btn';
import './css/style.css';

import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from 'simplelightbox';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryImages: document.querySelector('.gallery'),
//   loadMoreButton: document.querySelector('.load-more'),
};


const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    captionPosition: "bottom"
});

const loadMoreButton = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true
});
const imagesApiService = new NewsImagesApiService();

console.log(loadMoreButton);

// loadMoreButton.show();
// loadMoreButton.disabled();

refs.searchForm.addEventListener('submit', onSearchForm);
loadMoreButton.refs.button.addEventListener('click', fetchImages);
// refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearchForm(e) {
  e.preventDefault();

  imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.searchQuery === '') {
    return Notify.info('Sorry, there are no images matching your search query. Please try again.');
  }

  loadMoreButton.show();
  lightbox.refresh();


  imagesApiService.resetPage();
  clearImagesContainer();
  lightbox.refresh();
  fetchImages();


}


function fetchImages() {
    loadMoreButton.disabled();


    imagesApiService.fetchImages().then((gallery) => {
        const { totalHits  } = gallery;


        if(gallery.total === 0) {
            Notify.info("Sorry, there are no images matching your search query. Please try again.")
            loadMoreButton.hide();
            return;
        }
        imagesApiService.incrementPage();
        appendImagesMarkup(gallery.hits);
        lightbox.refresh();

        const amountOfPages = totalHits / 40 - imagesApiService.page;
        if(amountOfPages < 1) {
        loadMoreButton.hide();
         Notify.info("We're sorry, but you've reached the end of search results.")
        
        }

        loadMoreButton.enable();
    }).catch(handleError);


}

function handleError() {
    console.log('Error!');
}
function appendImagesMarkup(gallery) {
  refs.galleryImages.insertAdjacentHTML('beforeend', renderGallery(gallery));
}

function clearImagesContainer() {
  refs.galleryImages.innerHTML = '';
}

