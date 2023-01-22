import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY_API = '32950349-b423a796dfbedf40b18320507';

export default class NewsImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

async fetchImages() {
    console.log(this);
    return await fetch(
      `https://pixabay.com/api/?key=${KEY_API}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    ).then((r) => r.json())
    

    // const response = await axios.get(`/?key=${KEY_API}&q=${this.searchQuery}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
    // this.incrementPage();
    // return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}

// function fetchImages(evt) {
//     const searchQuery = evt.currentTarget.elements.query.value;
//     fetch(`https://pixabay.com/api/?key=${KEY_API}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`,)
//     .then(r => r.json())
//     .then(console.log());
//   }

//   export { fetchImages };

// console.log(KEY_API);
