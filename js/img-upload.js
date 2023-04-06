const form = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const inputForHashtags = document.querySelector('.text__hashtags');
const inputForDescription = document.querySelector('.text__description');
const isEscapeKey = evt => evt.key === 'Escape';

const onPopupEscKeydown = evt => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const toggleDocumentKeydownListener = (evt) => {
  const action = evt.type === 'focus' ? 'removeEventListener' : 'addEventListener';
  document[action]('keydown', onPopupEscKeydown);
};

const addListeners = () => {
  document.addEventListener('keydown', onPopupEscKeydown);
  document.querySelector('#upload-cancel').addEventListener('click', closeForm);
  inputForHashtags.addEventListener('focus', toggleDocumentKeydownListener);
  inputForDescription.addEventListener('focus', toggleDocumentKeydownListener);
  inputForHashtags.addEventListener('blur', toggleDocumentKeydownListener);
  inputForDescription.addEventListener('blur', toggleDocumentKeydownListener);
};

const openForm = () => {
  uploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    addListeners();
  });
};

const removeListeners = () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
  inputForHashtags.removeEventListener('focus', toggleDocumentKeydownListener);
  inputForDescription.removeEventListener('focus', toggleDocumentKeydownListener);
  inputForHashtags.removeEventListener('blur', toggleDocumentKeydownListener);
  inputForDescription.removeEventListener('blur', toggleDocumentKeydownListener);
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  removeListeners();
  document.querySelectorAll('input, textarea').forEach(el => (el.value = ''));
};

const pristine = new Pristine(form, {
  classTo: 'text',
  errorTextParent: 'text',
});

const isHashtag = hashtag => {
  const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}/;
  return regex.test(hashtag);
};

const validHashtags = value => {
  if (value === '') return true;
  const arrOfHashtags = value.split(' ').map(v => v.toLowerCase());
  if (arrOfHashtags.length > 5 || !arrOfHashtags.every(isHashtag)) return false;
  const duplicates = arrOfHashtags.filter((number, index, numbers) => numbers.indexOf(number) !== index);
  return duplicates.length === 0;
};

pristine.addValidator(inputForHashtags, validHashtags, 'Incorrect hashtags');

form.addEventListener('submit', evt => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

openForm();
