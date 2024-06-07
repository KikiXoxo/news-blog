'use strict';

const body = document.querySelector('body');
const trendingNews = document.querySelector('.trending-news__content');
const categories = document.querySelector('.categories__content');
const allCategories = document.querySelector('.all__categories');
const searchNewsInput = document.querySelector('#searchInput');
const newsSuggestionsContainer = document.querySelector('#suggestions');
const newsErrorMessage = document.querySelector('.error-message');
const apiKey = '6e8162eedc7a465bb22620a3bdc25d8a';
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

// CATEGORIES GENERATION
const generateCaterogies = function () {
  const url = 'https://newsapi.org/v2/sources';

  fetch(url, {
    headers: {
      'X-Api-Key': apiKey,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      categoriesArray = Array.from(
        new Set(data.sources.map(source => source.category))
      );
      console.log(categoriesArray);

      // Display only first 4
      const limitedCategories = categoriesArray.slice(1, 5);
      console.log(limitedCategories);

      limitedCategories.forEach((cat, i) => {
        const categoriesItem = document.createElement('div');
        categoriesItem.classList.add('categories__item');

        categoriesItem.innerHTML = `
        <a href="#">
          <div class="categories__item__content flex flex--column flex--column--center">
            <div class="categories__item__header">
              <h3>${cat}</h3>
            </div>
            <div class="img--container img--container--1">
              <img class="" src="img/categories/${cat}.jpg" alt="category">
            </div>
          </div>
        </a>
        `;

        if (i % 2 === 1)
          categoriesItem
            .querySelector('.categories__item__content')
            .classList.add('flex--reverse');

        categories.appendChild(categoriesItem);
      });

      // DYNAMICALLY CREATE CATEGORIES - A lot did not have img urls (showed null), so commenting them out
      // console.log(categoriesArray);
      // categoriesArray.forEach(cat => {
      //   const newsCategory = document.createElement('div');
      //   newsCategory.classList.add(`${cat}`, 'category', 'news__content');

      //   fetch(
      //     `https://newsapi.org/v2/top-headlines?category=${cat}&pageSize=6`,
      //     {
      //       headers: {
      //         'X-Api-Key': apiKey,
      //       },
      //     }
      //   )
      //     .then(res => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not ok');
      //       }
      //       return res.json();
      //     })
      //     .then(data => {
      //       console.log(data.articles);

      //       data.articles.forEach(article => {
      //         const newsItem = document.createElement('div');
      //         newsItem.classList.add('news__item');

      //         const formattedDate = formatDate(article.publishedAt);
      //         const formattedDescription =
      //           article.description && article.description.length > 110
      //             ? article.description.slice(0, 110) + '...'
      //             : article.description;
      //         const formattedTitle =
      //           article.title && article.title.length > 80
      //             ? article.title.slice(0, 80) + '...'
      //             : article.title;

      //         if (article.urlToImage) {
      //           newsItem.innerHTML = `
      //     <a href="#">
      //       <div class="news__item__content">
      //         <div class="img--container">
      //           <img class="" src="${article.urlToImage}" alt="${article.title}">
      //         </div>
      //         <div class="flex--column flex--column--left">
      //           <h3>${formattedTitle}</h3>
      //           <p class="description">${formattedDescription}</p>
      //           <p class="subscript"><i class="fa-solid fa-user"></i> ${article.author}</p>
      //           <p class="subscript"><i class="fa-regular fa-calendar-days"></i> ${formattedDate}</p>
      //         </div>
      //       </div>
      //     </a>`;

      //           newsCategory.appendChild(newsItem);
      //         }
      //       });
      //     })
      //     .catch(error => {
      //       console.error(
      //         `Error fetching data for category ${category}:`,
      //         error
      //       );
      //     });

      //   allCategories.appendChild(newsCategory);
      // });
    })
    .catch(error => {
      console.error('There was a problem fetching the categories:', error);
    });
};
generateCaterogies();

// SEARCH FUNCTIONALITY
const searchFunc = function () {
  const debounce = (func, delay) => {
    let debounceTimeout;

    return function (...args) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const showNewsSuggestions = function (articles) {
    newsSuggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (articles.length > 0) {
      articles.forEach((article, index) => {
        const link = document.createElement('a');
        link.classList.add('suggestion');
        link.textContent = article.title;
        link.href = `selectednews.html?title=${encodeURIComponent(
          article.title
        )}&author=${encodeURIComponent(
          article.author
        )}&description=${encodeURIComponent(
          article.description
        )}&date=${encodeURIComponent(
          article.publishedAt
        )}&imageUrl=${encodeURIComponent(
          article.urlToImage
        )}&content=${encodeURIComponent(article.content)}`;
        link.target = '_blank'; // redirect to new page

        link.addEventListener('click', () => {
          searchNewsInput.value = article.title;
          newsSuggestionsContainer.style.display = 'none';
        });

        newsSuggestionsContainer.appendChild(link);
      });

      newsSuggestionsContainer.style.display = 'block';
    } else {
      newsSuggestionsContainer.style.display = 'none';
    }
  };

  // Search articles
  const searchArticles = function (query) {
    if (query.length === 0) {
      newsSuggestionsContainer.innerHTML = '';
      newsSuggestionsContainer.style.display = 'none';
      newsErrorMessage.style.display = 'none';
      return;
    }

    newsErrorMessage.style.display = 'none'; // Hide message while fetching

    const filteredArticles = trendingArticles.filter(
      article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        (article.description &&
          article.description.toLowerCase().includes(query.toLowerCase()))
    );

    setTimeout(() => {
      showNewsSuggestions(filteredArticles);
    }, 500);
  };

  // Debounced search function
  const debouncedSearchArticles = debounce(searchArticles, 500);

  // Search input events
  searchNewsInput.addEventListener('input', function () {
    const query = searchNewsInput.value.trim();
    debouncedSearchArticles(query);
  });

  searchNewsInput.addEventListener('focus', function () {
    container.classList.add('top-aligned');
  });

  searchNewsInput.addEventListener('blur', function () {
    setTimeout(() => container.classList.remove('top-aligned'), 300);
  });

  // Click outside search input
  document.addEventListener('click', event => {
    if (
      !searchNewsInput.contains(event.target) &&
      !newsSuggestionsContainer.contains(event.target)
    ) {
      newsSuggestionsContainer.innerHTML = '';
      newsSuggestionsContainer.style.display = 'none';
    }
  });
};
searchFunc();
