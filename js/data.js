import {getRandomInt} from './util.js';

const commentsList = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const namesList = ['Максим', 'Кирилл', 'Мария', 'Ксения', 'Александр', 'Саша', 'Клава', 'Кира'];

const MAX_PHOTO_COUNT = 5;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 3;
let messageId = 1;

const makePosts = (id, likes, comments) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: 'Описание мы добавим в следующем обновлении :)',
  likes: likes,
  comments: comments,
});

function createPost(count=MAX_PHOTO_COUNT) {
  const posts = [];
  for (let i = 1; i < count + 1; i++) {
    const likes = getRandomInt(15, 200);
    posts.push(makePosts(i, likes, createComment(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)));
  }
  return posts;
}


function createComment(minn, maxx,) {

  const messageList = [];

  for (let i = 1; i <= getRandomInt(minn,maxx); i++) {
    const comment = {
      id: messageId,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: commentsList[getRandomInt(0, commentsList.length - 1)],
      name: namesList[getRandomInt(0, namesList.length - 1)],
    };
    messageList.push(comment);
    messageId += 1;
  }
  return messageList;
}


export {createPost};


