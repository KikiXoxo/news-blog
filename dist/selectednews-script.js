'use strict';

const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const author = urlParams.get('author');
const description = urlParams.get('description');
const date = urlParams.get('date');
const imageUrl = urlParams.get('imageUrl');
const content = urlParams.get('content');
console.log(date);

const formatDate = function (dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

// Update HTML elements
document.getElementById('title').textContent = title;
document.getElementById('author').textContent = author;
document.getElementById('description').textContent = description;
document.getElementById('date').textContent = formatDate(date);
document.getElementById('image').src = imageUrl;
document.getElementById('content').textContent = content;
