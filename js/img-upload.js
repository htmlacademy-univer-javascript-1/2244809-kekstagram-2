const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const cancelButton = document.querySelector('#upload-cancel');
const formElements = document.querySelectorAll('input, textarea');

const ESCAPE_KEY = 'Escape';

function addEventListeners() {
  document.addEventListener('keydown', handleEscapeKey);
  cancelButton.addEventListener('click', closeForm);
  hashtagInput.addEventListener('focus', removeEscapeKeyListener);
  descriptionInput.addEventListener('focus', removeEscapeKeyListener);
  hashtagInput.addEventListener('blur', addEscapeKeyListener);
  descriptionInput.addEventListener('blur', addEscapeKeyListener);
}

function removeEventListeners() {
  document.removeEventListener('keydown', handleEscapeKey);
  cancelButton.removeEventListener('click', closeForm);
  hashtagInput.removeEventListener('focus', removeEscapeKeyListener);
  descriptionInput.removeEventListener('focus', removeEscapeKeyListener);
  hashtagInput.removeEventListener('blur', addEscapeKeyListener);
  descriptionInput.removeEventListener('blur', addEscapeKeyListener);
}

function handleEscapeKey(evt) {
  if (evt.key === ESCAPE_KEY) {
    evt.preventDefault();
    closeForm();
  }
}

function removeEscapeKeyListener() {
  document.removeEventListener('keydown', handleEscapeKey);
}

function addEscapeKeyListener() {
  document.addEventListener('keydown', handleEscapeKey);
}

function openForm() {
  uploadFile.addEventListener('change', () => {
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');
    addEventListeners();
  });
}

function closeForm() {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  removeEventListeners();
  formElements.forEach((el) => (el.value = ''));
}

const pristine = new Pristine(uploadFile);

pristine.addValidator(hashtagInput, (value) => {
  const arrOfHashtags = value.split(' ').map((v) => v.toLowerCase());
  const duplicates = arrOfHashtags.filter((number, index, numbers) => numbers.indexOf(number) !== index);
  return duplicates.length > 0;
}, 'Duplicate hashtags are not allowed.');

const isValid = pristine.validate();

openForm();
