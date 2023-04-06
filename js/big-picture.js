const bigPictureElem = document.querySelector('.big-picture');
const imgElem = bigPictureElem.querySelector('.big-picture__img img');
const likesCountElem = bigPictureElem.querySelector('.likes-count');
const commentsCountElem = bigPictureElem.querySelector('.comments-count');
const captionElem = bigPictureElem.querySelector('.social__caption');
const commentsContainerElem = document.querySelector('.social__comments');

export function viewPhotoInFullSize(photo) {
  imgElem.src = photo.url;
  likesCountElem.textContent = photo.likes;
  commentsCountElem.textContent = photo.comments.length;
  captionElem.textContent = photo.description;
  document.querySelector('.social__comment-count').classList.toggle('hidden', true);
  document.querySelector('.comments-loader').classList.toggle('hidden', true);
  document.body.classList.add('modal-open');
  bigPictureElem.classList.toggle('hidden', false);
}

export function closeFullSizePhoto() {
  bigPictureElem.classList.toggle('hidden', true);
  document.body.classList.remove('modal-open');
}

function deleteComments() {
  const arrOfCom = commentsContainerElem.querySelectorAll('.social__comment');
  if (arrOfCom.length > 0) {
    arrOfCom.forEach(comment => comment.remove());
  }
}

export function createComments(comments) {
  let clone = commentsContainerElem.querySelector('.social__comment').cloneNode(true);
  deleteComments();
  comments.forEach(comment => {
    const imgElem = clone.querySelector('.social__picture');
    imgElem.src = comment.avatar;
    imgElem.alt = comment.name;
    clone.querySelector('.social__text').textContent = comment.message;
    commentsContainerElem.appendChild(clone);
    clone = commentsContainerElem.querySelector('.social__comment').cloneNode(true);
  });
}
