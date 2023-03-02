// Функция, возвращающая случайное целое число, от min до max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max)
    return console.log('Максимальное число в диапазоне меньше минимального!');
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, проверяющая длину строки
function checkStringLength(currentString, maxLength) {
  return !(currentString.length > maxLength);
}

