const API_KEY = 'bc81098602d242d283217f81a2354d33';
const BASE_URL = 'http://newsapi.org/v2';

export default class NewspiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const options = {
      headers: {
        Authorization: API_KEY,
      },
    };

    const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({ articles }) => {
        this.page += 1;
        return articles;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
