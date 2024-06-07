'use strict';

const body = document.querySelector('body');
const trendingNews = document.querySelector('.trending-news__content');
const categories = document.querySelector('.categories__content');
const allCategories = document.querySelector('.all__categories');
const searchNewsInput = document.querySelector('#searchInput');
const newsSuggestionsContainer = document.querySelector('#suggestions');
const newsErrorMessage = document.querySelector('.error-message');
// const apiKey = '6e8162eedc7a465bb22620a3bdc25d8a';
let trendingArticles = [];
let categoriesArray;

// FORMAT DATE FUNCTION
const formatDate = function (dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

// GENERATE TRENDING NEWS
const generateTrending = function () {
  const url = 'https://newsapi.org/v2/top-headlines?country=us';

  fetch(url, {
    headers: {
      'X-Api-Key': apiKey,
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok ');
      }
      return res.json();
    })
    .then(data => {
      console.log(data.articles);
      trendingArticles = data.articles;

      data.articles.forEach(article => {
        const trendingNewsItem = document.createElement('div');
        trendingNewsItem.classList.add('news__item');

        const formattedDate = formatDate(article.publishedAt);

        const formattedDescription =
          article.description && article.description.length > 110
            ? article.description.slice(0, 110) + '...'
            : article.description;
        const formattedTitle =
          article.title && article.title.length > 80
            ? article.title.slice(0, 80) + '...'
            : article.title;

        if (article.urlToImage) {
          trendingNewsItem.innerHTML = `
          <a href="selectednews.html?title=${encodeURIComponent(
            article.title
          )}&author=${encodeURIComponent(
            article.author
          )}&description=${encodeURIComponent(
            article.description
          )}&date=${encodeURIComponent(
            article.publishedAt
          )}&imageUrl=${encodeURIComponent(
            article.urlToImage
          )}&content=${encodeURIComponent(article.content)}">
            <div class="news__item__content">
              <div class="img--container">
                <img class="" src="${article.urlToImage}" alt="${
            article.title
          }">
              </div>
              <div class="flex--column flex--column--left">
                <h3>${formattedTitle}</h3>
                <p class="description">${formattedDescription}</p>
                <p class="subscript"><i class="fa-solid fa-user"></i> ${
                  article.author
                }</p>
                <p class="subscript"><i class="fa-regular fa-calendar-days"></i> ${formattedDate}</p>
              </div>
            </div>
          </a>`;

          trendingNews.appendChild(trendingNewsItem);
        }
      });
    })
    .catch(err => {
      console.error('There has been a problem with your fetch operation:', err);
    });
};
generateTrending();
