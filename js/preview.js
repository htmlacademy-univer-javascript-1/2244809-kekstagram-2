import { createPost } from './data.js';

// Получаем элемент списка фотографий и шаблон элемента
const photoListElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создаем массив фотографий и фрагмент списка фотографий
const photos = createPost();
const photoListFragment = document.createDocumentFragment();

// Заполняем фрагмент элементами фотографий
photos.forEach(({ url, likes, comments }) => {
  const photoElement = createPhotoElement(url, likes, comments.length);
  photoListFragment.appendChild(photoElement);
});

// Добавляем фрагмент в список фотографий
photoListElement.insertAdjacentElement('beforeend', photoListFragment);

// Создаем элемент фотографии и заполняем его данными
function createPhotoElement(url, likes, commentsCount) {
  const photoElement = photoTemplate.cloneNode(true);
  const imgElement = photoElement.querySelector('.picture__img');
  const likesElement = photoElement.querySelector('.picture__likes');
  const commentsElement = photoElement.querySelector('.picture__comments');

  imgElement.src = url;
  likesElement.textContent = likes;
  commentsElement.textContent = commentsCount;

  return photoElement;
}
export {createPhotoElement}
