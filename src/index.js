import './css/common.css';
// import onSearch from './onsearch';
import arcticlesTpl from './templates/articles.hbs';
import NewspiService from './js/news-service';
import LoadMoreBtn from './js/components/load-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newApiService = new NewspiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(event) {
  event.preventDefault();
  newApiService.query = event.currentTarget.elements.query.value;

  loadMoreBtn.show();
  newApiService.resetPage();
  clearArticlesContainer();

  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newApiService.fetchArticles().then(articles => {
    loadMoreBtn.enable();
    appendArticleMarkup(articles);
  });
}

function appendArticleMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', arcticlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
