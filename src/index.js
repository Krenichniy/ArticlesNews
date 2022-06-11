import './css/common.css';
// import onSearch from './onsearch';
import arcticlesTpl from './templates/articles.hbs';
import NewspiService from './js/components/news-service';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newApiService = new NewspiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  newApiService.query = event.currentTarget.elements.query.value;

  newApiService.resetPage();

  newApiService.fetchArticles().then(articles => {
    clearArticlesContainer();
    appendArticleMarkup(articles);
  });
}

function onLoadMore() {
  newApiService.fetchArticles().then(appendArticleMarkup);
}

function appendArticleMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', arcticlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
