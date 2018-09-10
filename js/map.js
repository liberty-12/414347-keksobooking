'use strict';

var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;

var avatars = ['1', '2', '3', '4', '5', '6', '7', '8'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var defenitionOfTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var getRandomInArray = function (arr, isNoRepeated) {
  var randomPosition = Math.floor((Math.random() * arr.length));
  var temp = arr[randomPosition];

  if (isNoRepeated) {
    arr.splice(randomPosition, 1);
  }

  return temp;
};

var getRandomInteger = function (min, max) {
  var random = Math.floor(min + Math.random() * (max + 1 - min));

  return random;
};

var getNewArray = function (arr, number) {
  var newArray = [];
  for (var i = 0; i < number; i++) {
    newArray[i] = arr[i];
  }

  return newArray;
};

var compareRule = function () {
  return Math.random() - 0.5;
};

var renderAdvertFeatures = function (avatarFeature, titleFeature, typeFeature, timeFeature, attribute, photoFeature) {
  var adverts = [];
  for (var i = 1; i <= 8; i++) {
    var x = getRandomInteger(0, 1200);
    var y = getRandomInteger(130, 630);
    var advert = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + getRandomInArray(avatarFeature, true) + '.png'
      },
      'offer': {
        'title': getRandomInArray(titleFeature, true),
        'address': x.toString() + ', ' + y.toString(),
        'price': getRandomInteger(1000, 1000000),
        'type': getRandomInArray(typeFeature),
        'rooms': getRandomInteger(1, 5),
        'guest': getRandomInteger(0, 5),
        'checkin': getRandomInArray(timeFeature),
        'checkout': getRandomInArray(timeFeature),
        'features': getNewArray(attribute, getRandomInteger(1, 6)),
        'description': '',
        'photos': photoFeature.sort(compareRule)
      },
      'location': {
        'x': x,
        'y': y
      }
    };
    adverts.push(advert);
  }

  return adverts;
};

var renderPin = function (card, template) {
  var pinElement = template.cloneNode(true);

  pinElement.style.left = (card.location.x - PIN_HALF_WIDTH).toString() + 'px';
  pinElement.style.top = (card.location.y - PIN_HEIGHT).toString() + 'px';
  pinElement.querySelector('img').src = card.author.avatar;
  pinElement.querySelector('img').alt = card.offer.title;

  return pinElement;
};

var renderCard = function (card, template, defenition) {
  var cardElement = template.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = defenition[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guest + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  // cardElement.querySelector('.popup__feature').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photo').src = card.offer.photos[0];
  // cardElement.querySelector('.popup__photo').cloneNode(true).src = card.offer.photos[1];
  // cardElement.querySelector('.popup__photo').cloneNode(true).src = card.offer.photos[2];

  return cardElement;
};
